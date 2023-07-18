import { _decorator, AudioClip, AudioSource, Component, instantiate, JsonAsset, Node, Prefab, resources, SpriteFrame, Vec3 } from "cc";
import { LetterIndex } from "./Constants";
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
        console.log("sounds", this.soundFolder);
        resolve();
      });
    });
  }

  /**
   * @description adding button over alphabet image of main screen
   * @param index index is the row number
   */

  addButtons(index: number) {
    if (index < 5) {
      const rowNumber = `row${index}`;
      console.log(rowNumber);

      const rowAlphabetData = this.alphabetPositionJSON.json[0].posData[rowNumber];
      this.addButtonRow(rowAlphabetData);

      this.addButtons(index + 1);
    }
  }

  /**
   * @description setting audio on button
   * @param rowAlphabetData data of each row ,fetching from JSON
   */
  addButtonRow(rowAlphabetData: any) {
    for (const key in rowAlphabetData) {
      const alphaButton = instantiate(this.alphabetButton);
      alphaButton.name = `${key}`;
      console.log(alphaButton.name);

      const soundClip = this.findSoundClipByName(`${key}`);
      if (soundClip) {
        alphaButton.getComponent(AudioSource).clip = soundClip;

        const pos = rowAlphabetData[key];
        alphaButton.setPosition(new Vec3(pos.x, pos.y, 0));

        this.alphabetNode.addChild(alphaButton);
      }
    }
  }

  /**
   * @description finding sound after comparing it to name of key passed into it
   * @param name key i.e. which alphabhet button it is
   * @returns  sound clip
   */
  findSoundClipByName(name: string): AudioClip | null {
    return this.soundFolder.find((sound) => sound.name == name) || null;
  }

  update(deltaTime: number) {}
}
