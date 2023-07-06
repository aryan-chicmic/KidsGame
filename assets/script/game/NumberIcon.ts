import {
    _decorator,
    Component,
    Node,
    randomRangeInt,
    Sprite,
    SpriteFrame,
} from "cc";
import { Singleton } from "./Singleton";
const { ccclass, property } = _decorator;

@ccclass("NumberIcon")
export class NumberIcon extends Component {
    // @property({ type: Node })
    // icon_node: Node = null;

    start() {
        // let randNumber = randomRangeInt(0, 10);
        // let icons = Singleton.getInstance().IconObject();
        // this.icon_node.getComponent(Sprite).spriteFrame = icons[randNumber];
    }

    update(deltaTime: number) {}
}
