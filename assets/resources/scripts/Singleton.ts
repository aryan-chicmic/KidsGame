import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Singleton")
export class Singleton extends Component {
  private static instance: Singleton = null;
  private target: string = "";
  private singleton() {}

  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
  get Target(): string {
    return this.target;
  }
  set Target(value: string) {
    this.target = value;
  }
  start() {}

  update(deltaTime: number) {}
}
