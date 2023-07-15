import {
    _decorator,
    Component,
    Node,
    ProgressBar,
    resources,
    SpriteFrame,
} from "cc";
import { MainScript } from "./MainScript";
const { ccclass, property } = _decorator;

@ccclass("Singleton")
export class Singleton extends Component {
    private static instance: Singleton | null = null;
    private iconObject: SpriteFrame[] = [];
    private mainScriptRef: MainScript | undefined;
    // percentage: number = 0;

    // progressbar: any;
    private singleton() {}
    start() {}
    static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    get MainScriptRef(): any {
        return this.mainScriptRef;
    }
    set MainScriptRef(value: any) {
        this.mainScriptRef = value;
    }

    IconObject(): any {
        return this.iconObject;
    }
    /**
     * @description loading all the sprites
     * @returns
     */
    loadIcons() {
        return new Promise<void>((resolve, reject) => {
            resources.loadDir(
                "sprites/prefabNumbers",
                SpriteFrame,
                // (finishedSprites, totalSprites) => {
                //     //on progress

                //     this.percentage = finishedSprites / totalSprites;

                //     console.log(this.percentage / 10);

                //     // this.PercentageNumber.string = this.percenatge.toString();
                //     this.progressbar = this.percentage / 10000;
                //     if (this.progressbar == 0.0001) {
                //         this.progressbar = 1;
                //     }
                // },
                (err, assets) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    this.iconObject = [];
                    this.iconObject = assets;
                    console.log(assets);

                    resolve();
                }
            );
        });
    }

    update(deltaTime: number) {}
}
