import { AudioSource } from "cc";
import {
  _decorator,
  AudioClip,
  Button,
  Component,
  instantiate,
  log,
  Node,
  Prefab,
  Sprite,
  SpriteFrame,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("SoundManager")
export class SoundManager extends Component {
  @property({ type: AudioClip })
  soundList: AudioClip = null;
  @property({ type: Prefab })
  DescriptionPrefab: Prefab = null;
  @property({ type: Node })
  Canvas: Node = null;

  start() {}
  onClick() {
    var target = this.node.name;

    switch (target) {
      case "One":
        // this.soundList.play();
        console.log(this.node);

        this.node.getComponent(AudioSource).clip = this.soundList;
        this.node.getComponent(AudioSource).play();
        setTimeout(() => {
          var prefabInstance = instantiate(this.DescriptionPrefab);
          this.Canvas.addChild(prefabInstance);
        }, 500);
        break;
      case "Two":
        // this.soundList.play();
        console.log(this.node);

        this.node.getComponent(AudioSource).clip = this.soundList;
        this.node.getComponent(AudioSource).play();
        setTimeout(() => {
          var prefabInstance = instantiate(this.DescriptionPrefab);
          this.Canvas.addChild(prefabInstance);
        }, 500);
        break;
      case "Three":
        console.log(this.node);
        this.node.getComponent(AudioSource).clip = this.soundList;
        this.node.getComponent(AudioSource).play();
        // this.soundList.play();
        setTimeout(() => {
          var prefabInstance = instantiate(this.DescriptionPrefab);
          this.Canvas.addChild(prefabInstance);
        }, 500);
        break;
    }
  }

  update(deltaTime: number) {}
}
