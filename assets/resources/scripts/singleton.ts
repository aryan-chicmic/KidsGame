import { _decorator, Component, Node, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("singleton")
export class singleton extends Component {
  private static instance: singleton = null;
  private target: string = "";
  private exampleImages: SpriteFrame[] = [];
  private nodeHolder: Node = null;
  private bannerNode: Node = null;
  private singleton() {}

  static getInstance(): singleton {
    if (!singleton.instance) {
      singleton.instance = new singleton();
    }
    return singleton.instance;
  }
  get Target(): string {
    return this.target;
  }
  set Target(value: string) {
    this.target = value;
  }

  get ExampleImages(): SpriteFrame[] {
    return this.exampleImages;
  }
  set ExampleImages(value: SpriteFrame[]) {
    this.exampleImages = value;
  }
  get BackgroundNodeHolder(): Node {
    return this.nodeHolder;
  }
  set BackgroundNodeHolder(value: Node) {
    this.nodeHolder = value;
  }
  get BannerNode(): Node {
    return this.bannerNode;
  }
  set BannerNode(value: Node) {
    this.bannerNode = value;
  }
  start() {}

  update(deltaTime: number) {}
}
