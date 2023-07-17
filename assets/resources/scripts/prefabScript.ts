import { _decorator, AudioSource, Component, Node, SpriteFrame, tween, Vec3, Animation, Label, Sprite } from "cc";
import { singleton } from "./singleton";
import { MessageCenter } from "./MessageCenter";
const { ccclass, property } = _decorator;

@ccclass("PrefabScript")
export class PrefabScript extends Component {
  @property({ type: Node })
  cracker: Node = null;
  @property({ type: Node })
  cracker1: Node = null;
  @property({ type: SpriteFrame })
  spritesMain: SpriteFrame[] = [];
  @property({ type: SpriteFrame })
  spritesSide: SpriteFrame[] = [];
  @property({ type: Node })
  animal: Node = null;
  @property({ type: Node })
  sideNumber: Node = null;
  @property({ type: Node })
  text: Node = null;

  start() {}
  protected onLoad(): void {
    this.targetChecker();
    MessageCenter.getInstance().send("audioEvents");
    this.animateCracker();
  }

  /**
   * @description checks which number has been clicked
   */
  targetChecker() {
    const target = singleton.getInstance().Target;
    const labelLookup = {
      "1": `${target} ANIMAL`,
      "0": "It means NULL(NOTHING)",
    };

    const label = labelLookup[target] || `${target} ANIMALS`;
    this.settingPopUp(parseInt(target), label);
  }

  /**
   * @description sets sprite of pop up
   * @param index it tells which sprite index needs to be attached
   * @param text Example text in popup
   */
  settingPopUp(index: number, text?: string) {
    this.animal.getComponent(Sprite).spriteFrame = this.spritesMain[index];
    if (index == 8) {
      this.animal.setScale(1.3, 1.3);
    } else {
      this.animal.setScale(0.5, 0.5);
    }

    this.sideNumber.getComponent(Sprite).spriteFrame = this.spritesSide[index];
    this.text.getComponent(Label).string = text;
  }

  /**
   * @description animation of crackers
   */
  animateCracker() {
    const crackScale = 1;

    const duration = 4;

    const onCompleteCallback = () => {
      this.cracker.active = false;
      this.cracker1.active = false;
    };

    const animateNode = (node) => {
      tween(node)
        .to(duration, { scale: new Vec3(crackScale, crackScale, 0) }, { easing: "sineOut", onComplete: onCompleteCallback })
        .start();
    };
    animateNode(this.cracker);
    animateNode(this.cracker1);
  }
  update(deltaTime: number) {}

  /**
   * @description on close button click of popup
   */
  onCloseClick() {
    MessageCenter.getInstance().send("resumeEvents");
    this.node.destroy();
  }
}
