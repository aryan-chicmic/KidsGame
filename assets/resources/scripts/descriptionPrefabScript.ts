import { _decorator, AudioSource, Component, Label, Node, Sprite, Animation, SpriteFrame, tween, Vec3 } from "cc";
import { singleton } from "./singleton";

const { ccclass, property } = _decorator;

@ccclass("descriptionPrefabScript")
export class descriptionPrefabScript extends Component {
  @property({ type: Node })
  cracker: Node = null;
  @property({ type: Node })
  cracker1: Node = null;

  @property({ type: Node })
  alphabhetImage: Node = null;

  start() {
    this.targetChecker();
    singleton.getInstance().BackgroundNodeHolder.getComponent(AudioSource).play();
    singleton.getInstance().BackgroundNodeHolder.getComponent(AudioSource).volume = 0.2;
    singleton.getInstance().BackgroundNodeHolder.getComponent(AudioSource).loop = true;
    this.animateCracker();
    this.animateCracker();
  }
  targetChecker() {
    const target = singleton.getInstance().Target;
    console.log(target);
    singleton.getInstance().ExampleImages.forEach((img) => {
      if (img.name === target) {
        this.settingSprites(img, target);
      }
    });
  }
  settingSprites(image: SpriteFrame, target: string) {
    if (target == "E" || target == "U") {
      this.alphabhetImage.setScale(1.2, 1.2);
    } else if (target == "P" || target == "V" || target == "Z") {
      this.alphabhetImage.setScale(0.8, 0.8);
    }
    this.alphabhetImage.getComponent(Sprite).spriteFrame = image;
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
    console.log("from pref ", this.node.parent);

    singleton.getInstance().BannerNode.getComponent(Animation).play("entry");
    singleton.getInstance().BackgroundNodeHolder.resumeSystemEvents(true);
    singleton.getInstance().BackgroundNodeHolder.getComponent(AudioSource).volume = 1;
    this.node.destroy();
  }
}
