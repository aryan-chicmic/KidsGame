import { _decorator, Component, Node, resources, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Singleton")
export class Singleton extends Component {
    private static instance: Singleton | null = null;
    private iconObject: SpriteFrame[] = [];
    private mainScriptRef;
    private check: Boolean = false;
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
    loadIcons() {
        return new Promise<void>((resolve, reject) => {
            resources.loadDir(
                "sprites/prefabNumbers",
                SpriteFrame,
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
