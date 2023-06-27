import { _decorator, AudioSource, Component, Label, Node, Sprite, Animation, SpriteFrame, tween, Vec3 } from "cc";
import { Singleton } from "./Singleton";
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
  numbr: Node = null;
  @property({ type: Node })
  text: Node = null;
  start() {
    this.targetChecker();
    this.node.parent.getComponent(AudioSource).play();
    this.node.parent.getComponent(AudioSource).volume = 0.5;
    this.node.parent.getComponent(AudioSource).loop = true;
    this.animateCracker();
    this.animateCracker();
  }
  targetChecker() {
    console.log(Singleton.getInstance().Target);

    switch (Singleton.getInstance().Target) {
      case "1":
        this.settingSprites(1, "1 FRUIT");
        break;
      case "2":
        this.settingSprites(2, "2 FRUITS");
        break;
      case "3":
        this.settingSprites(3, "3 FRUITS");
        break;
      case "4":
        this.settingSprites(4, "4 FRUITS");
        break;
      case "5":
        this.settingSprites(5, "5 FRUITS");
        break;
      case "6":
        this.settingSprites(6, "6 FRUITS");
        break;
    }
  }
  settingSprites(index: number, text?: string) {
    this.animal.getComponent(Sprite).spriteFrame = this.spritesMain[index - 1];
    // if (index == 4) {
    //   this.animal.setScale(0.75, 0.75);
    //   //   this.numbr.getComponent(Sprite).spriteFrame = this.spritesSide[index];
    // } else if (index == 8) {
    //   this.animal.setScale(1.3, 1.3);
    // }
    console.log(this.numbr);

    this.numbr.getComponent(Sprite).spriteFrame = this.spritesSide[index - 1];
    this.text.getComponent(Label).string = text;
  }
  animateCracker() {
    const crackScale = 1;

    const duration = 2;

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
  onCloseClick() {
    this.node.parent.getComponent(AudioSource).play();
    // this.node.parent.getChildByName("LabelBoard").getComponent(Animation).play("entry");
    console.log(this.node.parent);

    this.node.destroy();
  }
}
