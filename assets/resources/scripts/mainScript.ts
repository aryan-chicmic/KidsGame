import { _decorator, Animation, AudioClip, AudioSource, Component, Input, instantiate, JsonAsset, Node, Prefab, resources, SpriteFrame, Vec3 } from "cc";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("mainScript")
export class mainScript extends Component {
  // @property
  // get showButtons(): Boolean {
  //   return this._showButtons;
  // }
  // set showButtons(value: Boolean) {
  //   this._showButtons = value;

  //   this.alphaNode.removeAllChildren();
  //   if (value) {
  //     this.addButtons();
  //   }
  // }
  // @property({ type: Boolean })
  // private _showButtons: Boolean = true;
  @property({ type: JsonAsset })
  alphabhetPositions: JsonAsset = null;
  @property({ type: Prefab })
  alphabhetButton: Prefab = null;
  @property({ type: Node })
  alphaNode: Node = null;
  @property({ type: Node })
  bannerNode: Node = null;
  soundFolder: AudioClip[] = [];

  onLoad() {
    singleton.getInstance().BackgroundNodeHolder = this.node;
    singleton.getInstance().BannerNode = this.bannerNode;
    this.loadSprites()
      .then(() => this.loadAudios())
      .then(() => this.addButtons())
      .catch((err) => console.error(err));
  }
  protected start(): void {
    this.bannerNode.getComponent(Animation).play("entry");
  }
  loadSprites() {
    return new Promise<void>((resolve, reject) => {
      resources.loadDir("sprites/prefab/alphabhets", SpriteFrame, (err, assets) => {
        if (err) {
          reject(err);
          return;
        }
        singleton.getInstance().ExampleImages = assets;
        console.log(assets);
        resolve();
      });
    });
  }

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

  addButtons() {
    let audioClipIndex = 0;
    for (let i = 1; i < Object.keys(this.alphabhetPositions.json[0].posData).length + 1; i++) {
      let rowNumber = `row${i}`;
      console.log(rowNumber);

      for (let key in this.alphabhetPositions.json[0].posData[rowNumber]) {
        let alphaButton = instantiate(this.alphabhetButton);
        alphaButton.name = `${key}`;
        alphaButton.getComponent(AudioSource).clip = this.soundFolder[audioClipIndex];
        audioClipIndex++;

        let pos = this.alphabhetPositions.json[0].posData[rowNumber][key];
        alphaButton.setPosition(new Vec3(pos.x, pos.y, 0));

        this.alphaNode.addChild(alphaButton);
      }
    }
  }

  update(deltaTime: number) {}
}
