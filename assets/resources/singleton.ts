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
    // if (sprite) this.ParentColumnArray[index].push(node);
    console.log(singleton.emptyArrays[index], index);

    singleton.emptyArrays[index].push(sprite);

    console.log("after pushing", singleton.emptyArrays);
  }
  update(deltaTime: number) {}
  loadIcons() {
    return new Promise<void>((resolve, reject) => {
      resources.loadDir("icons", SpriteFrame, (err, assets) => {
        if (err) {
          reject(err);
          return;
        }

        this.iconObject = assets;
        // console.log(this.iconObject);
        this.initalArray();
        resolve();
      });
    });
  }
}
