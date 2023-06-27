import { _decorator, AudioSource, Component, instantiate, Node, Prefab } from "cc";
import { Singleton } from "./Singleton";
const { ccclass, property } = _decorator;

@ccclass("MainScript")
export class MainScript extends Component {
  @property({ type: Prefab })
  DescriptionPrefab: any;
  @property({ type: Node })
  CallButton: Node = null;
  @property({ type: Node })
  TigerButton: Node = null;
  @property({ type: Node })
  SmilieButton: Node = null;
  start() {}
  onClick(event) {
    console.log(event.target.name);
    if (event.target.name != "CallButton" && this.CallButton.getComponent(AudioSource).playing) {
      this.CallButton.getComponent(AudioSource).pause();
    } else if (event.target.name != "TigerButton" && this.TigerButton.getComponent(AudioSource).playing) {
      this.TigerButton.getComponent(AudioSource).pause();
    } else if (event.target.name != "SmilieButton" && this.SmilieButton.getComponent(AudioSource).playing) {
      this.SmilieButton.getComponent(AudioSource).pause();
    }

    if (event.target.name == "CallButton" || event.target.name == "TigerButton" || event.target.name == "SmilieButton") {
      this.node.getComponent(AudioSource).pause();
      event.target.getComponent(AudioSource).play();
      event.target.getComponent(AudioSource).loop = true;
    } else {
      Singleton.getInstance().Target = event.target.name;
      this.node.getComponent(AudioSource).volume = 0.1;
      // this.labelMonkey.active = false;

      console.log(event.target._name);

      event.target.getComponent(AudioSource).play();
      setTimeout(() => {
        const prefabInstance = instantiate(this.DescriptionPrefab);
        this.node.addChild(prefabInstance);
      }, 1000);
    }
    // console.log(event.target.getComponent(AudioSource).clip);
  }

  update(deltaTime: number) {}
}
