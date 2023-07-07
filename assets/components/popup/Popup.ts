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

    @property({ type: AudioClip })
    popUpSounds: AudioClip[] | null = [];
    protected newFlag: string | null = null;
    check: Boolean = false;
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
    updateData() {
        console.log("Hello world");
    }

    protected updateDisplay(options: string) {
        this.check = Boolean(options);
        this.curFlagLabel &&
            (this.curFlagLabel.string = options
                ? "CONGRATULATIONS"
                : "WRONG ANSWER");

        const audioSource = this.node.getComponent(AudioSource);
        if (this.check) {
            this.curFlagLabel?.getComponent(Animation)?.play("congratsLabel");
            this.audioPlaying(audioSource, 0);
            setTimeout(() => {
                this.audioPlaying(audioSource, 1);
            }, 1500);
        } else {
            this.curFlagLabel?.getComponent(Animation)?.play("wrong");
            this.audioPlaying(audioSource, 2);
            setTimeout(() => {
                this.audioPlaying(audioSource, 3);
            }, 1500);
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
        if (this.popUpSounds) {
            audioSource && (audioSource.clip = this.popUpSounds[soundIndex]);
            audioSource && (audioSource.volume = 0.7);
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
        this.updateFlag();
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
