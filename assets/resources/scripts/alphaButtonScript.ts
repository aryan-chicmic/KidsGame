import { _decorator, AudioClip, Animation, AudioSource, Component, instantiate, Node, Prefab } from "cc";

import { MessageCenter } from "./MessageCenter";
import { Singleton } from "./Singleton";

const { ccclass, property } = _decorator;

@ccclass("alphaButtonScript")
export class alphaButtonScript extends Component {
  @property({ type: Prefab })
  DescriptionPrefab: Prefab = null;

  /**
   * @description on click of main scene buttons
   * @param event
   */
  onClick(event) {
    Singleton.getInstance().BannerNode.getComponent(Animation).play("exit");
    MessageCenter.getInstance().send("pauseSysEvents");
    Singleton.getInstance().BackgroundNodeHolder.getComponent(AudioSource).pause();
    Singleton.getInstance().Target = event.currentTarget.name;
    console.log(event.currentTarget.name);

    event.currentTarget.getComponent(AudioSource).play();
    setTimeout(() => {
      const prefabInstance = instantiate(this.DescriptionPrefab);
      Singleton.getInstance().BackgroundNodeHolder.addChild(prefabInstance);
    }, 1000);
  }
  update(deltaTime: number) {}
}
