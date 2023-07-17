import { _decorator, AudioSource, Component, Label, Node, Sprite, Animation, SpriteFrame, tween, Vec3 } from "cc";

import { MessageCenter } from "./MessageCenter";
import { Singleton } from "./Singleton";

const { ccclass, property } = _decorator;

@ccclass("descriptionPrefabScript")
export class descriptionPrefabScript extends Component {
  @property({ type: Node })
  crackerList: Node[] = [];
  @property({ type: Node })
  alphabhetImage: Node = null;

  start() {
    this.targetChecker();
    MessageCenter.getInstance().send("audioSysEvents");
    this.animateCracker();
  }

  /**
   * @description checking which button is clicked
   */
  targetChecker() {
    const target = Singleton.getInstance().Target;
    console.log(target);
    console.log("Images", Singleton.getInstance().ExampleImages);

    Singleton.getInstance().ExampleImages.forEach((img) => {
      if (img.name == target) {
        this.settingSprites(img, target);
      }
    });
  }

  /**
   * @description setting sprites of the button clicked
   * @param image
   * @param target
   */
  settingSprites(image: SpriteFrame, target: string) {
    if (target == "e" || target == "u") {
      this.alphabhetImage.setScale(1.2, 1.2);
    } else if (target == "p" || target == "v" || target == "z") {
      this.alphabhetImage.setScale(0.8, 0.8);
    }
    this.alphabhetImage.getComponent(Sprite).spriteFrame = image;
  }

  /**
   * @description cracker animation
   */
  animateCracker() {
    const crackScale = 1;

    const duration = 2;

    const onCompleteCallback = () => {
      this.crackerList.forEach((cracker) => {
        cracker.active = false;
      });
    };

    const animateNode = (node) => {
      tween(node)
        .to(duration, { scale: new Vec3(crackScale, crackScale, 0) }, { easing: "sineOut", onComplete: onCompleteCallback })
        .start();
    };
    this.crackerList.forEach((cracker) => {
      animateNode(cracker);
    });
  }
  update(deltaTime: number) {}

  /**
   * @description prefab close button functionality
   */
  onCloseClick() {
    Singleton.getInstance().BannerNode.getComponent(Animation).play("entry");
    MessageCenter.getInstance().send("resumeSysEvents");
    Singleton.getInstance().BackgroundNodeHolder.getComponent(AudioSource).volume = 1;
    this.node.destroy();
  }
}
