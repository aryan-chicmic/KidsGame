import { _decorator, AudioSource, Component, instantiate, Node, Animation, AnimationClip, Prefab, AudioClip } from "cc";
import { singleton } from "./singleton";
import { MessageCenter } from "./MessageCenter";
const { ccclass, property } = _decorator;

@ccclass("NumberButton")
export class NumberButton extends Component {
  @property({ type: AnimationClip })
  AnimationEffects: AnimationClip = null;
  @property({ type: Prefab })
  DescriptionPrefab: Prefab = null;
  @property({ type: AudioClip })
  soundClips: AudioClip[] = [];
  start() {}

  /**
   * @description on click of Number of the main screen
   * @param event
   */
  onClick(event) {
    MessageCenter.getInstance().send("pauseWorking");
    singleton.getInstance().Target = event.target.name;
    switch (event.target.name) {
      case "1":
      case "2":
      case "3":
        this.playAnimationAndSound(event);
        break;
    }
  }

  /**
   * @description playing animation and sound respectively on click of number on main screen
   * Here using setTimeout because need to hear the sound of number clicked before opening the prefab
   */
  playAnimationAndSound = (event) => {
    event.target.addComponent(Animation);
    const targetAniation = event.target.getComponent(Animation);
    const targetAudioSource = event.target.getComponent(AudioSource);

    targetAniation.defaultClip = this.AnimationEffects;
    targetAniation.play();
    targetAudioSource.clip = this.soundClips[parseInt(event.target.name) - 1];
    targetAudioSource.play();
    setTimeout(() => {
      targetAniation.on(Animation.EventType.LASTFRAME, () => {
        targetAniation.stop();
        targetAniation.destroy();
      });

      const prefabInstance = instantiate(this.DescriptionPrefab);

      singleton.getInstance().BackgroundHolder.addChild(prefabInstance);
    }, 1000);
  };
  update(deltaTime: number) {}
}
