import { _decorator, Component, Input, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("NewComponent")
export class NewComponent extends Component {
  start() {
    console.log("in PRefab");
  }
  onClick(event) {
    console.log("Target :", event.currentTarget.name);
  }
  update(deltaTime: number) {}
}
