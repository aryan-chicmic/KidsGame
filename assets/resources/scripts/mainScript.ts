import { _decorator, Component, Input, instantiate, JsonAsset, Node, Prefab, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("mainScript")
export class mainScript extends Component {
  @property
  get showButtons(): Boolean {
    return this._showButtons;
  }
  set showButtons(value: Boolean) {
    this._showButtons = value;

    this.alphaNode.removeAllChildren();
    if (value) {
      this.addButtons();
    }
  }
  @property({ type: Boolean })
  private _showButtons: Boolean = true;

  @property({ type: JsonAsset })
  alphabhetPositions: JsonAsset = null;
  @property({ type: Prefab })
  alphabhetButton: Prefab = null;
  @property({ type: Node })
  alphaNode: Node = null;
  protected onLoad(): void {
    this.addButtons();
    // console.log("Hello world yo test  ", this.alphabhetPositions.json[0]["posData"].row1);
  }

  addButtons() {
    for (let i = 1; i < Object.keys(this.alphabhetPositions.json[0].posData).length + 1; i++) {
      let rowNumber = `row${i}`;
      console.log(rowNumber);

      for (let key in this.alphabhetPositions.json[0].posData[rowNumber]) {
        var alphaButton = instantiate(this.alphabhetButton);
        alphaButton.name = `${key}`;

        console.log(alphaButton);

        // alphaButton.setPosition(this.alphabhetPositions.json[0].posData[rowNumber][key]);
        let pos = this.alphabhetPositions.json[0].posData[rowNumber][key];
        alphaButton.setPosition(new Vec3(pos.x, pos.y, 0));

        this.alphaNode.addChild(alphaButton);
      }
    }
  }

  start() {
    // console.log(Object.keys(this.alphabhetPositions.json.posData.row1).length);
    console.log(this.alphaNode);
  }

  update(deltaTime: number) {}
}
