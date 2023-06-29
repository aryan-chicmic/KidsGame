import { _decorator, AudioClip, Animation, AudioSource, Component, instantiate, Node, Prefab } from "cc";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("alphaButtonScript")
export class alphaButtonScript extends Component {
  @property({ type: Prefab })
  DescriptionPrefab: Prefab = null;

  onClick(event) {
    singleton.getInstance().BannerNode.getComponent(Animation).play("exit");
    singleton.getInstance().BackgroundNodeHolder.pauseSystemEvents(true);
    singleton.getInstance().BackgroundNodeHolder.getComponent(AudioSource).pause();
    console.log("Target :", event.currentTarget);
    singleton.getInstance().Target = event.currentTarget.name;
    event.currentTarget.getComponent(AudioSource).play();
    setTimeout(() => {
      const prefabInstance = instantiate(this.DescriptionPrefab);
      singleton.getInstance().BackgroundNodeHolder.addChild(prefabInstance);
    }, 1000);
  }
  update(deltaTime: number) {}
}
