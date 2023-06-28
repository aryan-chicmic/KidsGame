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
    const target = Singleton.getInstance().Target;
    const labelLookup = {
      "1": `${target} FRUIT`,
    };
    const label = labelLookup[target] || `${target} FRUITS`;
    this.settingSprites(parseInt(target), label);
  }
  settingSprites(index: number, text?: string) {
    this.animal.getComponent(Sprite).spriteFrame = this.spritesMain[index - 1];
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
    this.node.parent.resumeSystemEvents(true);
    this.node.parent.getComponent(AudioSource).play();
    this.node.destroy();
  }
}
