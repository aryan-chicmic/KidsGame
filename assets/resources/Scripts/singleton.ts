import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("singleton")
export class singleton extends Component {
  private static instance: singleton = null;
  private target: string = "";
  private backgroundHolder: Node = null;
  private singleton() {}

  static getInstance(): singleton {
    if (!singleton.instance) {
      singleton.instance = new singleton();
    }
    return singleton.instance;
  }
  get BackgroundHolder(): Node {
    return this.backgroundHolder;
  }
  set BackgroundHolder(ref) {
    this.backgroundHolder = ref;
  }
  get Target(): string {
    return this.target;
  }
  set Target(value: string) {
    this.target = value;
  }

  update(deltaTime: number) {}
}
