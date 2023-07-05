import { _decorator, Component, Node, resources, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("singleton")
export class singleton extends Component {
  private static instance: singleton = null;
  private iconObject: SpriteFrame[] = [];
  private singleton() {}
  static emptyArrays;
  parentArray: any[] = [];
  initalArray() {
    singleton.emptyArrays = [];
    singleton.emptyArrays = Array.from({ length: this.iconObject.length }, () => []);
  }
  IconObject(): any {
    return this.iconObject;
  }

  static getInstance(): singleton {
    if (!singleton.instance) {
      singleton.instance = new singleton();
    }
    return singleton.instance;
  }
  arrayMaker(index: number, sprite: SpriteFrame = null) {
    singleton.emptyArrays[index].push(sprite);
  }
  update(deltaTime: number) {}
  loadIcons() {
    return new Promise<void>((resolve, reject) => {
      resources.loadDir("sprites/icons", SpriteFrame, (err, assets) => {
        if (err) {
          reject(err);
          return;
        }
        this.iconObject = [];
        this.iconObject = assets;
        this.initalArray();
        resolve();
      });
    });
  }
}
