import { _decorator, Component, Animation, Director, director, Game, game, Label, Node, Vec3, tween } from "cc";
const { ccclass, property } = _decorator;

@ccclass("popUp")
export class popUp extends Component {
  @property({ type: Label })
  headingText: Label = null;
  @property({ type: Label })
  tryAgainText: Label = null;
  initialFunc: Function = null;
  mainScriptRef;
  @property({ type: Node })
  cracker: Node = null;
  @property({ type: Node })
  cracker1: Node = null;
  start() {}

  settingHeading(correct: boolean, initialFunc: Function, ref: any) {
    if (correct) {
      this.animateCracker();
      this.animateCracker();
      this.initialFunc = initialFunc;
      this.mainScriptRef = ref;
      this.headingText.getComponent(Animation).play("correctLabel");
      this.headingText.string = "Congratulations!";
      this.tryAgainText.string = "Next";
    } else {
      this.headingText.string = "Wrong Answer!";
      this.headingText.getComponent(Animation).play("wrongLabel");
      this.tryAgainText.string = "Try Again";
    }
  }
  onQuit() {
    game.end();
  }
  animateCracker() {
    const crackScale = 1;
    const duration = 2;
    const onCompleteCallback = () => {
      this.cracker.active = false;
      this.cracker1.active = false;
    };

    const animateNode = (node) => {
      tween(node)
        .to(duration, { scale: new Vec3(crackScale, crackScale, 0) }, { easing: "sineOut", onComplete: onCompleteCallback })
        .start();
    };
    animateNode(this.cracker);
    animateNode(this.cracker1);
  }
  onOtherButton() {
    if (this.node.getComponent(popUp).tryAgainText.string == "Try Again") {
      this.node.destroy();
    } else {
      this.node.destroy();
      this.mainScriptRef.gameLoader();
    }
    this.node.parent.getChildByName("Background").resumeSystemEvents(true);
  }
  update(deltaTime: number) {}
}
