import { _decorator, Component, Node, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PrefabScript")
export class PrefabScript extends Component {
  start() {}
  onCloseClick() {
    this.node.destroy();
  }
  update(deltaTime: number) {}
}
