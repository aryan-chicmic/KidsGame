import { _decorator, Component, director, Node, Animation } from "cc";
import { Singleton } from "./Singleton";

const { ccclass, property } = _decorator;

@ccclass("loader")
export class loader extends Component {
  @property({ type: Node })
  loading: Node = null;
  start() {
    Singleton.getInstance()
      .loadSprites()
      .then(() => Singleton.getInstance().loadAudios())
      .then(() => {
        let animation = this.loading.getComponent(Animation);
        animation.on(
          Animation.EventType.FINISHED,
          () => {
            this.changeScene();
          },
          this
        );
      });
  }

  changeScene() {
    director.loadScene("main", () => {});
  }
}
