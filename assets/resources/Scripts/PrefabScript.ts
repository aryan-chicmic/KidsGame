import { _decorator, AnimationClip, AudioSource, Component, Label, Node, Sprite, SpriteFrame, tween, Vec3 } from "cc";
import { singleton } from "./singleton";
import { MainScript } from "./MainScript";

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
  dog: Node = null;
  @property({ type: Node })
  numbr: Node = null;
  @property({ type: Node })
  text: Node = null;

  start() {}
  onLoad(): void {
    this.targetChecker();
    this.animateCracker();
    this.animateCracker();
  }
  targetChecker() {
    switch (singleton.getInstance().Target) {
      case "One":
        this.settingSprites(0, "1 DOG");
        break;
      case "Two":
        this.settingSprites(1, "2 DOGS");
        break;
      case "Three":
        this.settingSprites(2, "3 DOGS");
        break;
    }
  }
  settingSprites(index: number, text: string) {
    this.dog.getComponent(Sprite).spriteFrame = this.spritesMain[index];
    this.numbr.getComponent(Sprite).spriteFrame = this.spritesSide[index];
    this.text.getComponent(Label).string = text;
  }
  animateCracker() {
    const crackScale = 4;

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

  onCloseClick() {
    this.node.parent.getChildByName("Bg").getComponent(MainScript).playAnimation();
    this.node.destroy();
  }
  update(deltaTime: number) {}
}
