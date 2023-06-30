import { _decorator, Component, EditBox, instantiate, JsonAsset, Label, Node, Prefab, randomRangeInt, resources, Sprite, SpriteFrame } from "cc";
import { singleton } from "./resources/singleton";
const { ccclass, property } = _decorator;
enum ICONTYPE {
  "RED" = 0,
  "BLACK" = 1,
  "WHITE" = 2,
  "BLUE" = 3,
  "TOTAL" = 4,
}
@ccclass("NewComponent")
export class NewComponent extends Component {
  @property({ type: Prefab })
  icons: Prefab = null;
  @property({ type: SpriteFrame })
  img: SpriteFrame[] = [];
  @property({ type: EditBox })
  editbox: EditBox = null;
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
  total = 0;
  start() {
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
    for (let i = 1; i <= randomRangeInt(this.minIcons, this.maxIcons); i++) {
      let iconNode = instantiate(this.icons);
      let spriteAdder = this.img[randomRangeInt(0, Object.keys(singleton.getInstance().IconObject()).length)];
      singleton.getInstance().arrayMaker(parseInt(spriteAdder.name), spriteAdder);
      iconNode.getComponent(Sprite).spriteFrame = spriteAdder;
      this.node.addChild(iconNode);
    }
  }
  questionMaker() {
    let data = this.questionaire.json;
    let questionNumber = randomRangeInt(0, 10) % Object.keys(data).length;
    this.label.string = data[questionNumber].question;
    var wordsArray = this.label.string.split(" ");
    wordsArray.forEach((word) => {
      if (ICONTYPE[word] !== undefined) {
        if (word !== "TOTAL") {
          this.total += singleton.emptyArrays[ICONTYPE[word]].length;
        } else {
          singleton.emptyArrays.forEach((element) => {
            this.total += element.length;
          });
        }
      }
    });
    console.log("Total", this.total);
    for (let i = 0; i < 4; i++) {
      console.log(i);

      let mcqButton = instantiate(this.buttonPrefab);
      this.buttonNode.addChild(mcqButton);
    }
    let currectButton = randomRangeInt(1, 9) % this.buttonNode.children.length;
    this.buttonNode.children[currectButton].getChildByName("Label").getComponent(Label).string = `${this.total}`;
    for (let i = 0; i < this.buttonNode.children.length; i++) {
      if (i !== currectButton) {
        const randomNumber = Math.floor(Math.random() * 10);
        this.buttonNode.children[i].getChildByName("Label").getComponent(Label).string = randomNumber.toString();
      }
    }
  }
  onEditBoxValueChanged(event) {
    let inputValue = parseInt(this.editbox.string);
    if (inputValue == this.total) {
      console.log("hurray you answered correctly");
    } else {
      console.log("Plz try again");
    }
  }

  update(deltaTime: number) {}
}
