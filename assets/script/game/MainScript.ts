import {
    _decorator,
    Component,
    instantiate,
    Node,
    isValid,
    Prefab,
    randomRangeInt,
    Sprite,
    SpriteFrame,
    Button,
    Label,
} from "cc";
import { Singleton } from "./Singleton";
import { NUMBER_MAPPING, SYMBOL_NAMES } from "../constants/Constant";
import PopupBase from "../../components/popup/PopupBase";
import { PopupManager } from "../managers/PopupManager";
import { POPUPS } from "../constants/Popup";
import { MessageCenter } from "../managers/MessageCenter";
const { ccclass, property } = _decorator;

@ccclass("MainScript")
export class MainScript extends PopupBase {
    @property({ type: Prefab })
    iconPrefab: Prefab | null = null;
    @property({ type: Node })
    number1: Node | null = null;
    @property({ type: Node })
    symbol: Node | null = null!;
    @property({ type: Node })
    number2: Node | null = null!;
    @property({ type: SpriteFrame })
    symbols: SpriteFrame[] = [];
    icons: SpriteFrame[] = [];
    @property({ type: Prefab })
    buttonPrefab: Prefab | null = null;
    @property({ type: Node })
    mcqButtonHolder: Node | null = null;

    //Global Variable
    totalMCQButtons: number = 4;
    symbolCheck: string = "";
    generatedNumber1: string = "";
    generatedNumber2: string = "";
    result: number = 0;
    protected onLoad(): void {}
    start() {
        MessageCenter.getInstance().register(
            "resumeSystemEvents",
            this.resumeButtonEvents.bind(this),
            this.node
        );
        Singleton.getInstance().MainScriptRef = this;
        this.spriteLoading();
    }
    /**
     * @description loading sprites by calling function from singleton,calling calculations of results function and then calling generating mcq buttons func
     */
    async spriteLoading() {
        this.mcqButtonHolder?.removeAllChildren();
        this.number1?.removeAllChildren();
        this.number2?.removeAllChildren();
        this.symbol?.removeAllChildren();

        await this.callingCreateNodeFunc();

        await this.calculation();

        await this.mcqButtonGeneration();
    }
    async callingCreateNodeFunc() {
        this.icons = Singleton.getInstance().IconObject();

        const randNumber1: number = randomRangeInt(0, 10);
        this.createAndAddNode(this.number1, randNumber1, this.iconPrefab);

        const randNumber2: number = randomRangeInt(0, 4);
        this.createAndAddNode(this.symbol, randNumber2, this.iconPrefab);

        const randNumber3: number = randomRangeInt(0, 10);
        this.createAndAddNode(this.number2, randNumber3, this.iconPrefab);
    }
    /**
     * @description instantiate the prefab and checks whther it is a type symbol or number and then assign sprite to it accordingly
     * @param parent  node to which symbol or number needs to be child of
     * @param randNumber randomly generated number for selecting sprite randomly
     * @param prefab prefab which needs to be instantiated
     */
    createAndAddNode = (
        parent: Node | null,
        randNumber: number,
        prefab: Prefab | null
    ) => {
        console.log(randNumber);

        if (parent && prefab) {
            const node: Node = instantiate(prefab) as Node;
            const spriteComponent: Sprite | null = node.getComponent(Sprite);

            switch (parent.name) {
                case "Symbol":
                    let randSymbol = this.symbols[randNumber];
                    spriteComponent &&
                        (spriteComponent.spriteFrame = randSymbol);

                    this.symbolCheck = Object.keys(SYMBOL_NAMES)[randNumber];
                    console.log(this.symbolCheck);
                    // node.setScale(1.5, 1.5);

                    break;
                case "Number1":
                    let randnumber1 = this.icons[randNumber];
                    spriteComponent &&
                        (spriteComponent.spriteFrame = randnumber1);

                    // let y = Object.keys(NUMBER_MAPPING)[randnumber1.name];

                    this.generatedNumber1 =
                        Object.keys(NUMBER_MAPPING)[randnumber1.name];
                    // Object.keys(NUMBER_MAPPING)[randNumber];
                    node.setScale(1.4, 1.4);
                    console.log(this.generatedNumber1);

                    break;
                case "Number2":
                    let randnumber2 = this.icons[randNumber];
                    spriteComponent &&
                        (spriteComponent.spriteFrame = randnumber2);

                    // let x = Object.keys(NUMBER_MAPPING)[randnumber2.name];

                    this.generatedNumber2 =
                        Object.keys(NUMBER_MAPPING)[randnumber2.name];
                    // Object.keys(NUMBER_MAPPING)[randNumber];
                    node.setScale(1.4, 1.4);
                    console.log(this.generatedNumber2);
                    break;
                default:
                    break;
            }

            parent.addChild(node);
        }
    };

    /**
     * @description calculating results according to the numbers generated
     */
    async calculation() {
        switch (this.symbolCheck) {
            case "DIVIDE":
                this.result = parseFloat(
                    (
                        parseInt(this.generatedNumber1) /
                        parseInt(this.generatedNumber2)
                    ).toFixed(2)
                );

                break;
            case "SUBTRACT":
                this.result =
                    parseInt(this.generatedNumber1) -
                    parseInt(this.generatedNumber2);
                break;
            case "MULTIPLICATION":
                this.result =
                    parseInt(this.generatedNumber1) *
                    parseInt(this.generatedNumber2);
                break;
            case "PLUS":
                this.result =
                    parseInt(this.generatedNumber1) +
                    parseInt(this.generatedNumber2);
                break;
        }
        console.log(this.result);
    }

    /**
     * @description mcq button generation with random unique numbers
     */
    async mcqButtonGeneration() {
        let usedNumbers = new Set<number>();
        let correctButton: number = randomRangeInt(0, 9) % 4;
        for (let i = 0; i < this.totalMCQButtons; i++) {
            let mcqButton: Node = <Node>(
                (<unknown>instantiate(this.buttonPrefab))
            );
            mcqButton.on(Button.EventType.CLICK, this.clicked, this);

            this.mcqButtonHolder?.addChild(mcqButton);

            let btnNode = mcqButton?.getChildByName("Label");
            let btnNodeComponent: Label | null | undefined =
                btnNode?.getComponent(Label);

            if (i != correctButton) {
                const randomNumber = this.randomUniqueNum(
                    100,
                    this.result,
                    usedNumbers
                );
                btnNodeComponent &&
                    (btnNodeComponent.string = `${randomNumber}`);
            } else {
                btnNodeComponent &&
                    (btnNodeComponent.string = `${this.result}`);
            }
        }
    }

    /**
     * @description it generates random unique numbers
     * @param range
     * @param exclude  number which we have choosen as result and wanted to exclude
     * @param usedNumbers already used numbers
     * @returns
     */
    randomUniqueNum(
        range: number,
        exclude: number,
        usedNumbers: Set<number>
    ): number {
        let result;
        do {
            result = Math.floor(Math.random() * range) + 1;
        } while (result === exclude || usedNumbers.has(result));
        usedNumbers.add(result);
        return result;
    }

    /**
     * @description it resumes the system events of mcq button holder
     */
    resumeButtonEvents() {
        this.mcqButtonHolder?.resumeSystemEvents(true);
    }

    /**
     * @description click function of mcq button
     * @param button
     */
    clicked(button: Button) {
        this.mcqButtonHolder?.pauseSystemEvents(true);
        const labelChild = button?.node.getChildByName("Label");
        const labelComponent = labelChild?.getComponent(Label);
        if (labelComponent?.string == `${this.result}`) {
            PopupManager.show(POPUPS.RESULTANT, true);
        } else {
            PopupManager.show(POPUPS.RESULTANT, false);
        }
    }
    update(deltaTime: number) {}
}
