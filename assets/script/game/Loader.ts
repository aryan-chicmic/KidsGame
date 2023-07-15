import {
    _decorator,
    Component,
    director,
    misc,
    Node,
    ProgressBar,
    Sprite,
    tween,
    Tween,
} from "cc";
import { fromTwos } from "ethers";
import { Singleton } from "./Singleton";
const { ccclass, property } = _decorator;

@ccclass("Loader")
export class Loader extends Component {
    @property({ type: Node })
    progressNode: Node | null = null;

    @property({ type: Sprite })
    progressSprite: Sprite | null = null;

    @property
    progress: number = 0;

    private loading: boolean = false;

    start() {
        // Singleton.getInstance().progressbar = this.progress;
        this.updateProgress();
        Singleton.getInstance().loadIcons();
    }

    update(dt: number) {
        this.progress += dt * 0.1;

        // if (Singleton.getInstance().progressbar >= 1) {
        //     Singleton.getInstance().progressbar = 1;
        if (this.progress >= 1) {
            this.progress = 1;
            if (!this.loading) {
                this.loading = true;
                this.changeScene();
            }
        }

        this.updateProgress();
    }

    updateProgress() {
        if (this.progressNode && this.progressSprite) {
            // const progressAngle = 360 * Singleton.getInstance().progressbar;
            const progressAngle = 360 * this.progress;

            this.progressSprite.fillRange = progressAngle / 360;
        }
    }

    changeScene() {
        director.loadScene("Gameplay", () => {
            this.loading = false;
        });
    }
}
