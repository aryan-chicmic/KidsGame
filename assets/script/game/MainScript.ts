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
const { ccclass, property } = _decorator;

@ccclass("MainScript")
export class MainScript extends Component {
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

    symbolCheck: string = "";
    generatedNumber1: string = "";
    generatedNumber2: string = "";
    result: number = 0;
    start() {
        this.spriteLoading();
    }
    spriteLoading() {
        Singleton.getInstance()
            .loadIcons()
            .then(() => {
                this.icons = Singleton.getInstance().IconObject();

                const randNumber1: number = randomRangeInt(0, 10);
                this.createAndAddNode(
                    this.number1,
                    randNumber1,
                    this.iconPrefab
                );

                const randNumber2: number = randomRangeInt(0, 4);
                this.createAndAddNode(
                    this.symbol,
                    randNumber2,
                    this.iconPrefab
                );

                const randNumber3: number = randomRangeInt(0, 10);
                this.createAndAddNode(
                    this.number2,
                    randNumber3,
                    this.iconPrefab
                );
            })
            .then(() => {
                this.calculation();
            })
            .then(() => {
                console.log(this.result);
            })
            .then(() => {
                this.mcqButtonGeneration();
            });
    }

    createAndAddNode = (
        parent: Node | null,
        randNumber: number,
        prefab: Prefab | null
    ) => {
        if (parent) {
            const node: Node = <Node>(<unknown>instantiate(prefab));
            const spriteComponent: Sprite = <Sprite>node.getComponent(Sprite);

            if (parent.name == "Symbol") {
                spriteComponent.spriteFrame = this.symbols[randNumber];
                this.symbolCheck = spriteComponent.spriteFrame.name;
                console.log(spriteComponent.spriteFrame.name, this.symbolCheck);
            } else if (parent.name == "Number1") {
                spriteComponent.spriteFrame = this.icons[randNumber];
                this.generatedNumber1 = spriteComponent.spriteFrame.name;
                console.log(spriteComponent.spriteFrame, this.generatedNumber1);
            } else if (parent.name == "Number2") {
                spriteComponent.spriteFrame = this.icons[randNumber];
                this.generatedNumber2 = spriteComponent.spriteFrame.name;
                console.log(spriteComponent.spriteFrame, this.generatedNumber2);
            }
            parent.addChild(node);
        }
    };
    calculation() {
        switch (this.symbolCheck) {
            case "divide":
                this.result =
                    parseInt(this.generatedNumber1) /
                    parseInt(this.generatedNumber2);
                break;
            case "subtract":
                this.result =
                    parseInt(this.generatedNumber1) -
                    parseInt(this.generatedNumber2);
                break;
            case "multiplication":
                this.result =
                    parseInt(this.generatedNumber1) *
                    parseInt(this.generatedNumber2);
                break;
            case "plus":
                this.result =
                    parseInt(this.generatedNumber1) +
                    parseInt(this.generatedNumber2);
                break;
        }
    }
    mcqButtonGeneration() {
        let usedNumbers = new Set<number>();
        for (let i = 0; i < 4; i++) {
            let mcqButton: Node = <Node>(
                (<unknown>instantiate(this.buttonPrefab))
            );
            mcqButton.on(Button.EventType.CLICK, this.clicked, this);
            this.mcqButtonHolder?.addChild(mcqButton);

            let correctButton: number = randomRangeInt(0, 9) % 4;
            let btnNode = mcqButton?.getChildByName("Label");
            let btnNodeComponent: Label | null | undefined =
                btnNode?.getComponent(Label);

            if (i != correctButton) {
                const randomNumber = this.randomUniqueNum(
                    9,
                    correctButton,
                    usedNumbers
                );
                if (btnNodeComponent)
                    btnNodeComponent.string = `${randomNumber}`;
            } else {
                btnNodeComponent!.string = "4";
            }
        }
    }
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
    clicked(button: Button) {
        // const labelComponent = button.node
        //     .getChildByName("Label")
        //     .getComponent(Label);
        // const isCorrectAnswer = labelComponent.string === `${this.total}`;
        // this.node.parent.pauseSystemEvents(true);
        // const popup = instantiate(this.popUp);
        // this.Canvas.addChild(popup);
        // popup.getComponent(popUp).settingHeading(isCorrectAnswer, this);
    }
    update(deltaTime: number) {}
}
