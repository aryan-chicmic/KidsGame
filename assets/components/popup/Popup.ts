import {
    _decorator,
    Component,
    Label,
    Node,
    Animation,
    AnimationClip,
    AudioClip,
    AudioSource,
    game,
    Vec3,
    tween,
} from "cc";
import { PopupManager } from "../../script/managers/PopupManager";
import { POPUPS } from "../../script/constants/Popup";
import PopupBase from "./PopupBase";
import { MainScript } from "../../script/game/MainScript";
import { Singleton } from "../../script/game/Singleton";

const { ccclass, property } = _decorator;

@ccclass("Popup")
export class Popup extends PopupBase {
    @property(Node)
    protected closeBtn: Node | null = null;

    @property(Label)
    protected curFlagLabel: Label | null = null;

    @property(Label)
    protected newFlagLabel: Label | null = null;

    @property(Node)
    protected normalBtn: Node | null = null;

    @property(Node)
    protected priorityBtn: Node | null = null;

    @property(Node)
    protected quitButton: Node | null = null;

    @property(Node)
    protected cracker: Node | null = null;

    @property(Node)
    protected cracker1: Node | null = null;

    @property({ type: AudioClip })
    popUpSounds: AudioClip[] | null = [];
    protected newFlag: string | null = null;
    check: Boolean = false;
    audioSource: AudioSource | null = null;
    /** Pop -up path */
    public static get path() {
        return "prefabs/settingsPopup";
    }
    protected onEnable(): void {}
    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    protected registerEvent() {}

    protected unregisterEvent() {}
    updateData() {}
    animateCracker() {
        console.log("in animate function");

        const crackScale = 1;
        const duration = 2;
        const onCompleteCallback = () => {
            console.log("in comblete callback");
            this.cracker?.setScale(0, 0);
            this.cracker1?.setScale(0, 0);
        };

        const animateNode = (node) => {
            console.log("in animateNode", node);

            tween(node)
                .to(
                    duration,
                    { scale: new Vec3(crackScale, crackScale, 0) },
                    { easing: "sineOut", onComplete: onCompleteCallback }
                )
                .start();
        };
        animateNode(this.cracker);
        animateNode(this.cracker1);
    }
    protected updateDisplay(options: string) {
        this.check = Boolean(options);
        this.curFlagLabel &&
            (this.curFlagLabel.string = options
                ? "CONGRATULATIONS"
                : "WRONG ANSWER");

        this.audioSource = this.node.getComponent(AudioSource);
        console.log("Node", this.node);

        if (this.check) {
            console.log("in check");

            this.animateCracker();
            this.curFlagLabel?.getComponent(Animation)?.play("congratsLabel");
            this.audioPlaying(this.audioSource, 0);
            setTimeout(() => {
                this.audioPlaying(this.audioSource, 1);
            }, 500);
        } else {
            this.curFlagLabel?.getComponent(Animation)?.play("wrong");
            this.audioPlaying(this.audioSource, 2);
            setTimeout(() => {
                this.audioPlaying(this.audioSource, 3);
            }, 500);
        }
        const labelChild = this.normalBtn?.getChildByName("Label");
        const labelComponent = labelChild?.getComponent(Label);
        labelComponent &&
            (labelComponent.string = options ? "NEXT" : "TRY AGAIN");
    }
    protected audioPlaying(
        audioSource: AudioSource | null,
        soundIndex: number
    ) {
        Singleton.getInstance().MainScriptRef.getComponent(
            AudioSource
        ).volume = 0.05;
        console.log("Node in audio", this.node);

        if (this.popUpSounds) {
            audioSource && (audioSource.clip = this.popUpSounds[soundIndex]);
            audioSource && (audioSource.volume = 1);
            audioSource && audioSource.play();
        }
    }
    protected updateFlag() {
        // this.newFlag = (Math.random() * 10000).toFixed(0).padStart(5, "0");
        this.newFlagLabel && (this.newFlagLabel.string = this.newFlag || "");
    }

    protected onCloseBtnClick() {
        this.hide();
    }

    protected onNormalBtnClick() {      
        console.log("afteer click", this.node);
        this.audioSource?.pause();
        Singleton.getInstance().MainScriptRef.getComponent(
            AudioSource
        ).volume = 1;
        this.hide();
        this.newFlag = "Normal Popup";
        if (this.check) {
            Singleton.getInstance().MainScriptRef.spriteLoading();
        } else {
            PopupManager.hide();
        }
    }

    protected onPriorityBtnClick() {
        this.newFlag = "Priority high ";
        PopupManager.show(POPUPS.SETTINGS, this.newFlag);
        this.updateFlag();
    }

    protected onQuitButtonClick() {
        game.end();
        this.newFlag = " Immediately open";
        PopupManager.show(POPUPS.TEST3, this.newFlag);
    }
}
