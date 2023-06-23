import { Animation, AnimationClip, AudioSource, UITransform } from "cc";
import { _decorator, AudioClip, Button, Component, instantiate, log, Node, Prefab, Sprite, SpriteFrame } from "cc";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("MainScript")
export class MainScript extends Component {
  @property({ type: Prefab })
  DescriptionPrefab: Prefab = null;
  @property({ type: Node })
  Canvas: Node = null;
  @property({ type: AnimationClip })
  AnimationEffects: AnimationClip = null;

  @property({ type: Node })
  footerAnimNode: Node = null;
  onClick(event) {
    singleton.getInstance().Target = event.target.name;

    const playAnimationAndSound = () => {
      this.footerAnimNode.active = false;
      // this.hand.active = false;
      // this.clickText.active = false;
      event.target.addComponent(Animation);
      event.target.getComponent(Animation).defaultClip = this.AnimationEffects;
      event.target.getComponent(Animation).play();

      event.target.getComponent(AudioSource).play();
      setTimeout(() => {
        event.target.getComponent(Animation).on(Animation.EventType.LASTFRAME, () => {
          event.target.getComponent(Animation).stop();
          event.target.getComponent(Animation).destroy();
        });

        const prefabInstance = instantiate(this.DescriptionPrefab);
        this.Canvas.addChild(prefabInstance);
      }, 1000);
    };

    switch (singleton.getInstance().Target) {
      case "One":
      case "Two":
      case "Three":
        playAnimationAndSound();
        break;
    }
  }
  playAnimation() {
    this.footerAnimNode.active = true;
  }
  update(deltaTime: number) {}
}
