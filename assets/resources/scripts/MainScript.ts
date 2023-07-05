import {
  _decorator,
  Button,
  Component,
  Animation,
  EditBox,
  instantiate,
  JsonAsset,
  Label,
  Node,
  Prefab,
  randomRangeInt,
  resources,
  Sprite,
  SpriteFrame,
  SystemEvent,
  UITransform,
  Vec3,
  Canvas,
  game,
} from "cc";
import { singleton } from "./singleton";
import { popUp } from "./popUp";

const { ccclass, property } = _decorator;
enum ICONTYPE {
  "RED" = 0,
  "BLACK" = 1,
  "WHITE" = 2,
  "BLUE" = 3,
  "TOTAL" = 4,
}
@ccclass("MainScript")
export class MainScript extends Component {
  @property({ type: Prefab })
  icons: Prefab = null;
  @property({ type: SpriteFrame })
  img: SpriteFrame[] = [];
  @property({ type: JsonAsset })
  questionaire: JsonAsset = null;
  @property({ type: Label })
  label: Label = null;
  @property({ type: Prefab })
  buttonPrefab: Prefab = null;
  @property({ type: Node })
  buttonNode: Node = null;
  iconObject: SpriteFrame[] = [];
  maxIcons: number = 9;
  minIcons: number = 1;
  @property({ type: Node })
  bg: Node = null;
  @property({ type: Node })
  monkeyNode: Node = null;
  @property({ type: Node })
  Canvas: Node = null;
  @property({ type: Prefab })
  popUp: Prefab = null;
  total = 0;
  start() {
    this.gameLoader();
  }
  gameLoader() {
    this.buttonNode.removeAllChildren();
    singleton
      .getInstance()
      .loadIcons()
      .then(() => {
        this.iconGenerator();
      })
      .then(() => {
        this.questionMaker();
      });
  }
  iconGenerator() {
    let iconNumber = randomRangeInt(this.minIcons, this.maxIcons);
    let bgWidth = this.bg.getComponent(UITransform).contentSize.width;
    let widthRatio = bgWidth / iconNumber;
    this.node.removeAllChildren();

    for (let i = 1; i <= iconNumber; i++) {
      let iconNode = instantiate(this.icons);
      let spriteAdder = this.img[randomRangeInt(0, Object.keys(singleton.getInstance().IconObject()).length)];
      singleton.getInstance().arrayMaker(parseInt(spriteAdder.name), spriteAdder);
      iconNode.getComponent(Sprite).spriteFrame = spriteAdder;
      let iconWidth = iconNode.getComponent(UITransform).contentSize.width;
      let scale = Math.min(widthRatio / iconWidth, 200 / iconWidth, 200 / iconNode.getComponent(UITransform).contentSize.height);
      iconNode.setScale(new Vec3(scale, scale, scale));
      this.node.addChild(iconNode);
    }
  }

  randomUniqueNum(range: number, exclude: number, usedNumbers: Set<number>): number {
    let result;
    do {
      result = Math.floor(Math.random() * range) + 1;
    } while (result === exclude || usedNumbers.has(result));
    usedNumbers.add(result);
    return result;
  }

  questionMaker() {
    let data = this.questionaire.json;
    let questionNumber = randomRangeInt(0, 10) % Object.keys(data).length;
    this.label.string = data[questionNumber].question;
    this.total = 0;
    var wordsArray = this.label.string.split(" ");
    wordsArray.forEach((word) => {
      if (ICONTYPE[word] !== undefined) {
        if (word != "TOTAL") {
          this.total += singleton.emptyArrays[ICONTYPE[word]].length;
        } else {
          singleton.emptyArrays.forEach((element) => {
            this.total += element.length;
          });
        }
      }
    });
    this.monkeyNode.getComponent(Animation).play("monkeyenter");
    this.mcqButtonGeneration();
  }
  mcqButtonGeneration() {
    for (let i = 0; i < 4; i++) {
      let mcqButton = instantiate(this.buttonPrefab);
      mcqButton.on(Button.EventType.CLICK, this.clicked, this);
      this.buttonNode.addChild(mcqButton);
    }
    let correctButton = randomRangeInt(1, 9) % this.buttonNode.children.length;
    this.buttonNode.children[correctButton].getChildByName("Label").getComponent(Label).string = `${this.total}`;
    let usedNumbers = new Set<number>();
    for (let i = 0; i < this.buttonNode.children.length; i++) {
      if (i !== correctButton) {
        const randomNumber = this.randomUniqueNum(9, this.total, usedNumbers);

        this.buttonNode.children[i].getChildByName("Label").getComponent(Label).string = randomNumber.toString();
      }
    }
  }
  clicked(button: Button) {
    const labelComponent = button.node.getChildByName("Label").getComponent(Label);
    const isCorrectAnswer = labelComponent.string === `${this.total}`;
    this.node.parent.pauseSystemEvents(true);
    const popup = instantiate(this.popUp);
    this.Canvas.addChild(popup);
    popup.getComponent(popUp).settingHeading(isCorrectAnswer, this.gameLoader, this);
  }

  update(deltaTime: number) {}
}
