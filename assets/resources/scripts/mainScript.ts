import { _decorator, Animation, AudioClip, AudioSource, Component, Input, instantiate, JsonAsset, Node, Prefab, resources, SpriteFrame, Vec3 } from "cc";

import { MessageCenter } from "./MessageCenter";
import { Singleton } from "./Singleton";
const { ccclass, property } = _decorator;

@ccclass("mainScript")
export class mainScript extends Component {
  @property({ type: JsonAsset })
  alphabhetPositions: JsonAsset = null;
  @property({ type: Prefab })
  alphabhetButton: Prefab = null;
  @property({ type: Node })
  alphaNode: Node = null;
  @property({ type: Node })
  bannerNode: Node = null;

  initialRow: number = 0;
  onLoad() {
    this.registerEvents();
    this.singletonReferencePassing();
    Singleton.getInstance().addButtons(this.initialRow);
  }

  /**
   * @description registering events for message center class
   */
  registerEvents() {
    MessageCenter.getInstance().register("resumeSysEvents", this.resumeEvents.bind(this), this.node);
    MessageCenter.getInstance().register("pauseSysEvents", this.pauseEvents.bind(this), this.node);
    MessageCenter.getInstance().register("audioSysEvents", this.audioEvents.bind(this), this.node);
  }

  /**
   * @description passing references to singleton class
   */
  singletonReferencePassing() {
    Singleton.getInstance().AlphabetButton = this.alphabhetButton;
    Singleton.getInstance().AlphabetNode = this.alphaNode;
    Singleton.getInstance().AlphabetPositionJSON = this.alphabhetPositions;
    Singleton.getInstance().BackgroundNodeHolder = this.node;
    Singleton.getInstance().BannerNode = this.bannerNode;
  }

  /**
   * @description making callback function for audio events. to be passed from message center
   */
  audioEvents() {
    this.node.getComponent(AudioSource).play();
    this.node.getComponent(AudioSource).volume = 0.2;
    this.node.getComponent(AudioSource).loop = true;
  }

  /**
   * @description callback func to resume events from message center
   */
  resumeEvents() {
    this.node.resumeSystemEvents(true);
  }

  /**
   * @description callback func to pause events from message center
   */
  pauseEvents() {
    this.node.pauseSystemEvents(true);
  }

  protected start(): void {
    this.bannerNode.getComponent(Animation).play("entry");
  }

  update(deltaTime: number) {}
}
