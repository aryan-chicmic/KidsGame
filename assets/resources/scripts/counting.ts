import { _decorator, Animation, AudioClip, AudioSource, BlockInputEvents, Canvas, Component, find, Input, instantiate, JsonAsset, Node, NodePool, Prefab, Sprite, SpriteFrame, SystemEvent, systemEvent, UITransform, v2, Vec2, Vec3 } from "cc";
import { singleton } from "./singleton";
import { MessageCenter } from "./MessageCenter";
const { ccclass, property } = _decorator;

@ccclass("counting")
export class counting extends Component {
  // @property

  @property({ type: Node })
  labelMonkey: Node = null;
  @property({ type: Node })
  numberButtonHolder: Node = null;

  @property({ type: Prefab })
  numberButton: Prefab = null;
  @property({ type: JsonAsset })
  numberPositions: JsonAsset = null;

  /**
   * @description callback func for resuming events i.e touch events and audio
   */
  resumeSystemEvent() {
    this.node.resumeSystemEvents(true);
    this.node.getComponent(AudioSource).play();
    this.labelMonkey.getComponent(Animation).play("entry");
  }

   /**
   * @description callback func for pausing events i.e touch events and audio
   */
  pauseSystemEvent() {
    this.node.pauseSystemEvents(true);
    this.labelMonkey.getComponent(Animation).play("exit");
  }

   /**
   * @description callback func for resuming audio
   */
  audioSourceEvents() {
    this.node.getComponent(AudioSource).play();
    this.node.getComponent(AudioSource).volume = 0.5;
    this.node.getComponent(AudioSource).loop = true;
  }

   /**
   * @description registering events and setting values of singleton
   */
  onLoad() {
    MessageCenter.getInstance().register("audioEvents", this.audioSourceEvents.bind(this), this.node);
    MessageCenter.getInstance().register("resumeEvents", this.resumeSystemEvent.bind(this), this.node);
    MessageCenter.getInstance().register("pauseEvents", this.pauseSystemEvent.bind(this), this.node);
    singleton.getInstance().PositionJson = this.numberPositions;
    singleton.getInstance().NumberButton = this.numberButton;
    singleton.getInstance().NumberButtonHolder = this.numberButtonHolder;
    singleton.getInstance().BackgroundNode = this.node;
    this.labelMonkey.getComponent(Animation).play("entry");
    singleton.getInstance().addButtons();
  }

  update(deltaTime: number) {}
}
