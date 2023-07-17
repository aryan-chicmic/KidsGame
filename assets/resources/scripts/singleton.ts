import { _decorator, AudioSource, Component, instantiate, JsonAsset, Node, Prefab, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("singleton")
export class singleton extends Component {
  private static instance: singleton = null;
  private target: string = "";
  private background: Node = null;
  private numberPositionJSON: JsonAsset = null;
  private numberButton: Prefab = null;
  private numberButtonHolder: Node = null;
  private singleton() {}

  static getInstance(): singleton {
    if (!singleton.instance) {
      singleton.instance = new singleton();
    }
    return singleton.instance;
  }
  get BackgroundNode(): Node {
    return this.background;
  }
  set BackgroundNode(ref) {
    this.background = ref;
  }
  get Target(): string {
    return this.target;
  }
  set Target(value: string) {
    this.target = value;
  }
  get PositionJson(): JsonAsset {
    return this.numberPositionJSON;
  }
  set PositionJson(value: JsonAsset) {
    this.numberPositionJSON = value;
  }
  get NumberButton(): Prefab {
    return this.numberButton;
  }
  set NumberButton(ref) {
    this.numberButton = ref;
  }
  get NumberButtonHolder(): Node {
    return this.numberButtonHolder;
  }
  set NumberButtonHolder(ref) {
    this.numberButtonHolder = ref;
  }
  animStarter() {}
  start() {}
  addButtons() {
    let audioClipIndex = 0;
    for (let i = 1; i < Object.keys(this.numberPositionJSON.json[0].posData).length + 1; i++) {
      let rowNumber = `row${i}`;
      console.log(rowNumber);

      for (let key in this.numberPositionJSON.json[0].posData[rowNumber]) {
        console.log(key);

        let alphaButton = instantiate(this.numberButton);
        alphaButton.name = `${key}`;
        //   alphaButton.getComponent(AudioSource).clip = this.soundFolder[audioClipIndex];
        // audioClipIndex++;

        let pos = this.numberPositionJSON.json[0].posData[rowNumber][key];
        alphaButton.setPosition(new Vec3(pos.x, pos.y, 0));

        this.numberButtonHolder.addChild(alphaButton);
      }
    }
    console.log(this.numberButtonHolder);
  }

  update(deltaTime: number) {}
}
