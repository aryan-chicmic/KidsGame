import { _decorator, AnimationClip, AudioSource, Component, Label, Node, Sprite, SpriteFrame, tween, Vec3 } from "cc";
import { singleton } from "./singleton";
import { MainScript } from "./MainScript";
import { MessageCenter } from "./MessageCenter";

const { ccclass, property } = _decorator;

@ccclass("PrefabScript")
export class PrefabScript extends Component {
  @property({ type: Node })
  crackerList: Node[] = [];
  @property({ type: SpriteFrame })
  spritesMain: SpriteFrame[] = [];
  @property({ type: SpriteFrame })
  spritesSide: SpriteFrame[] = [];
  @property({ type: Node })
  dog: Node = null;
  @property({ type: Node })
  sideNumber: Node = null;
  @property({ type: Node })
  text: Node = null;

  start() {}
  /**
   * @description playing the BG sound and calling cracker animation and checking target to set sprites
   */
  onLoad(): void {
    singleton.getInstance().BackgroundHolder.getComponent(AudioSource).play();
    singleton.getInstance().BackgroundHolder.getComponent(AudioSource).volume = 0.5;
    singleton.getInstance().BackgroundHolder.getComponent(AudioSource).loop = true;
    this.spriteSetter();
    this.animateCracker();
  }

  /**
   * @description setting sprites with respect to target name obtained
   */
  spriteSetter() {
    switch (singleton.getInstance().Target) {
      case "1":
        this.dog.setScale(0.1, 0.1);
        this.settingSprites(0, "1 DOG");
        break;
      case "2":
        this.settingSprites(1, "2 DOGS");
        break;
      case "3":
        this.settingSprites(2, "3 DOGS");
        break;
    }
  }

  /**
   *
   * @param index here index is used to access particular sprite from array
   * @param text text displayed at bottom
   */
  settingSprites(index: number, text: string) {
    this.dog.getComponent(Sprite).spriteFrame = this.spritesMain[index];
    this.sideNumber.getComponent(Sprite).spriteFrame = this.spritesSide[index];
    this.text.getComponent(Label).string = text;
  }

  /**
   * @description crackers are displayed using this
   */
  animateCracker() {
    const crackerScale = 4;

    const duration = 2;

    const onCompleteCallback = () => {
      this.crackerList.forEach((crackerNode) => {
        crackerNode.active = false;
      });
    };

    const animateNode = (node) => {
      tween(node)
        .to(duration, { scale: new Vec3(crackerScale, crackerScale, 0) }, { easing: "sineOut", onComplete: onCompleteCallback })
        .start();
    };
    this.crackerList.forEach((crackerNode) => {
      animateNode(crackerNode);
    });
  }

  /**
   * @description on click of close button
   */
  onCloseClick() {
    MessageCenter.getInstance().send("resumeWorking");
    singleton.getInstance().BackgroundHolder.getComponent(AudioSource).play();
    MessageCenter.getInstance().send("playAnimation");
    this.node.destroy();
  }
  update(deltaTime: number) {}
}
