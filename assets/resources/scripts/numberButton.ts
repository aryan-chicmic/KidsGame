import { _decorator, AudioClip, AudioSource, Component, Animation, instantiate, Node, Prefab } from "cc";
import { singleton } from "./singleton";
import { MessageCenter } from "./MessageCenter";
const { ccclass, property } = _decorator;

@ccclass("numberButton")
export class numberButton extends Component {
  @property({ type: Prefab })
  DescriptionPrefab: Prefab = null;
  @property({ type: AudioClip })
  audios: AudioClip[] = [];

  start() {}
  /**
   * @description click of a main number button
   * @param event
   */
  onClick(event) {
    MessageCenter.getInstance().send("pauseEvents");
    singleton.getInstance().Target = event.target.name;
    this.node.getComponent(AudioSource).volume = 0.3;
    event.target.getComponent(AudioSource).clip = this.audios[`${event.target.name}`];
    event.target.getComponent(AudioSource).play();
    setTimeout(() => {
      const prefabInstance = instantiate(this.DescriptionPrefab);
      singleton.getInstance().BackgroundNode.addChild(prefabInstance);
    }, 1000);
  }
  update(deltaTime: number) {}
}
