import { Animation, AnimationClip, AudioSource, UITransform } from "cc";
import { _decorator, AudioClip, Button, Component, instantiate, log, Node, Prefab, Sprite, SpriteFrame } from "cc";
import { singleton } from "./singleton";
import { MessageCenter } from "./MessageCenter";
const { ccclass, property } = _decorator;
export enum NUMBER_MAPPING {
  NUMBER0 = 0,
  NUMBER1 = 1,
  NUMBER2 = 2,
  NUMBER3 = 3,
  NUMBER4 = 4,
  NUMBER5 = 5,
  NUMBER6 = 6,
  NUMBER7 = 7,
  NUMBER8 = 8,
  NUMBER9 = 9,
}
@ccclass("MainScript")
export class MainScript extends Component {
  @property({ type: Prefab })
  NumberButton: Prefab = null;
  @property({ type: Node })
  ButtonHolder: Node = null;
  @property({ type: Node })
  footerAnimNode: Node = null;
  @property({ type: SpriteFrame })
  numberSprites: SpriteFrame[] = [];

  //globals
  totalNumbers: number = 2;

  /**
   * @description setting singleton object and registering for message center class
   */
  protected onLoad(): void {
    singleton.getInstance().BackgroundHolder = this.node;
    MessageCenter.getInstance().register("pauseWorking", this.pauseComponentWorking.bind(this), this.node);
    MessageCenter.getInstance().register("resumeWorking", this.resumeComponentWorking.bind(this), this.node);
    MessageCenter.getInstance().register("playAnimation", this.playAnimation.bind(this), this.node);
  }
  start() {
    this.numberGenerator();
  }

  /**
   * @description numbers to be clicked are geenrated and spritframe is set
   */
  numberGenerator() {
    for (let i = 0; i <= this.totalNumbers; i++) {
      let button = instantiate(this.NumberButton);
      button.name = `${i + 1}`;
      button.getComponent(Sprite).spriteFrame = this.numberSprites[i];
      this.ButtonHolder.addChild(button);
    }
  }

  /**
   * @description pausing working of different components
   */
  pauseComponentWorking() {
    this.ButtonHolder.pauseSystemEvents(true);
    this.node.getComponent(AudioSource).pause();
    this.footerAnimNode.active = false;
  }

  /**
   * @description resuming system events to take touch
   */
  resumeComponentWorking() {
    this.ButtonHolder.resumeSystemEvents(true);
  }

  /**
   * @description playing footer  animation
   */
  playAnimation() {
    this.footerAnimNode.active = true;
  }
  update(deltaTime: number) {}
}
