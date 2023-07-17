import { _decorator, AudioClip, AudioSource, Component, instantiate, JsonAsset, Node, Prefab, resources, SpriteFrame, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Singleton")
export class Singleton extends Component {
  private static instance: Singleton = null;
  private target: string = "";
  private exampleImages: SpriteFrame[] = [];
  private nodeHolder: Node = null;
  private bannerNode: Node = null;
  private alphabetNode: Node = null;

  private alphabetButton: Prefab = null;
  private alphabetPositionJSON: JsonAsset = null;
  soundFolder: AudioClip[] = [];
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
  get AlphabetPositionJSON(): JsonAsset {
    return this.alphabetPositionJSON;
  }
  set AlphabetPositionJSON(value: JsonAsset) {
    this.alphabetPositionJSON = value;
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
  get AlphabetButton(): Prefab {
    return this.alphabetButton;
  }
  set AlphabetButton(value: Prefab) {
    this.alphabetButton = value;
  }
  get AlphabetNode(): Node {
    return this.alphabetNode;
  }
  set AlphabetNode(value: Node) {
    this.alphabetNode = value;
  }
  start() {}

  /**
   * @description loading sprites
   * @returns spriteframes
   */
  loadSprites() {
    return new Promise<void>((resolve, reject) => {
      resources.loadDir("sprites/prefab/alphabhets", SpriteFrame, (err, assets) => {
        if (err) {
          reject(err);
          return;
        }
        Singleton.getInstance().ExampleImages = assets;
        console.log(assets);
        resolve();
      });
    });
  }

  /**
   * @description loading audio clips
   * @returns audioclips
   */
  loadAudios() {
    return new Promise<void>((resolve, reject) => {
      resources.loadDir("sounds/alphabhetSounds", AudioClip, (err, assets) => {
        if (err) {
          reject(err);
          return;
        }

        this.soundFolder = assets;
        console.log(this.soundFolder);
        resolve();
      });
    });
  }

  /**
   * @description adding button over alphabet image of main screen
   */
  addButtons() {
    let audioClipIndex = 0;
    for (let i = 1; i < Object.keys(this.alphabetPositionJSON.json[0].posData).length + 1; i++) {
      let rowNumber = `row${i}`;
      console.log(rowNumber);

      for (let key in this.alphabetPositionJSON.json[0].posData[rowNumber]) {
        let alphaButton = instantiate(this.alphabetButton);
        alphaButton.name = `${key}`;
        alphaButton.getComponent(AudioSource).clip = this.soundFolder[audioClipIndex];
        audioClipIndex++;

        let pos = this.alphabetPositionJSON.json[0].posData[rowNumber][key];
        alphaButton.setPosition(new Vec3(pos.x, pos.y, 0));

        this.alphabetNode.addChild(alphaButton);
      }
    }
  }

  update(deltaTime: number) {}
}
