import {
  _decorator,
  Animation,
  AudioClip,
  AudioSource,
  BlockInputEvents,
  Canvas,
  Component,
  find,
  Input,
  instantiate,
  Node,
  NodePool,
  Prefab,
  Sprite,
  SpriteFrame,
  SystemEvent,
  systemEvent,
  UITransform,
  v2,
  Vec2,
  Vec3,
} from "cc";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("counting")
export class counting extends Component {
  // @property
  @property({ type: AudioClip })
  audios: AudioClip[] = [];
  @property({ type: Node })
  numberNodes: Node[] = [];
  @property({ type: Node })
  labelMonkey: Node = null;
  @property({ type: Prefab })
  DescriptionPrefab: Prefab = null;
  @property({ type: Node })
  Canvas: Node = null;
  onClick(event) {
    this.node.pauseSystemEvents(true);
    singleton.getInstance().Target = event.target.name;
    this.node.getComponent(AudioSource).volume = 0.3;
    this.labelMonkey.getComponent(Animation).play("exit");
    event.target.getComponent(AudioSource).clip = this.audios[`${event.target.name}`];
    event.target.getComponent(AudioSource).play();
    setTimeout(() => {
      const prefabInstance = instantiate(this.DescriptionPrefab);
      this.node.addChild(prefabInstance);
    }, 1000);
  }
  protected start(): void {
    this.labelMonkey.getComponent(Animation).play("entry");
  }

  update(deltaTime: number) {}
}
