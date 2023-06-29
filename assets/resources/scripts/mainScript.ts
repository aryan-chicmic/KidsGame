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

  onLoad() {
    singleton.getInstance().AlphabetButton = this.alphabhetButton;
    singleton.getInstance().AlphabetNode = this.alphaNode;
    singleton.getInstance().AlphabetPositionJSON = this.alphabhetPositions;
    singleton.getInstance().BackgroundNodeHolder = this.node;
    singleton.getInstance().BannerNode = this.bannerNode;
    singleton
      .getInstance()
      .loadSprites()
      .then(() => singleton.getInstance().loadAudios())
      .then(() => singleton.getInstance().addButtons())
      .catch((err) => console.error(err));
  }
  protected start(): void {
    this.bannerNode.getComponent(Animation).play("entry");
  }

  update(deltaTime: number) {}
}
