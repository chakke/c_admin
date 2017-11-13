import { Utils } from "../../app-utils";
import { AlertController } from 'ionic-angular';
import { IComponentType } from '../interface/i-component-type';
import { ComponentType } from '../app-constant';
var id: number = 0;


export class UIComponent {
    id: number;
    title: string;
    type: IComponentType;
    typeName: string;
    classList: Array<string> = [];
    innerHtml: string;
    width: number;
    height: number;
    x: number;
    y: number;
    zIndex = 10;
    rotate: number = 0;
    constructor(title?: string, x?: number, y?: number, width?: number, height?: number) {
        id++;
        this.id = id;
        this.type = ComponentType.UI_COMPONENT;
        this.typeName = "";
        this.classList.push("map-symbol");
        this.innerHtml = "";
        this.title = title ? title : "";
        this.x = (x ? x : 0);
        this.y = (y ? y : 0);
        this.width = (width ? width : 50);
        this.height = (height ? height : 50);
    }

    doRotate() {
        this.rotate += 90;
        this.rotate = this.rotate % 360;
    }

    upIndex() {
        this.zIndex++;
    }

    downIndex() {
        this.zIndex--;
    }

}

export class Area extends UIComponent {
    constructor(title?: string, x?: number, y?: number, width?: number, height?: number) {
        super(title, x, y, width, height);
        this.classList.push("ui-area");
        this.type = ComponentType.AREA;
        if (!width)
            this.width = 100;
        if (!height)
            this.height = 100;
        this.zIndex = 9;
    }
}
export class Table extends UIComponent {
    constructor(title?: string, x?: number, y?: number, width?: number, height?: number) {
        super(title, x, y, width, height);
        this.classList.push("ui-table");
        this.type = ComponentType.TABLE;
    }
}
export class Door extends UIComponent {
    constructor(title?: string, x?: number, y?: number, width?: number, height?: number) {
        super(title, x, y, width, height);
        this.classList.push("ui-door");
        this.type = ComponentType.DOOR;
        if (!height)
            this.height = 30;
        this.innerHtml = `<div class="barrier left"> </div>
                        <div class="part left"></div>
                        <div class="part right"></div>
                        <div class="barrier right"></div>`;
    }
}
export class WC extends UIComponent {
    constructor(title?: string, x?: number, y?: number, width?: number, height?: number) {
        super(title, x, y, width, height);
        this.classList.push("ui-wc");
        this.type = ComponentType.WC;
    }
}
export class Kitchen extends UIComponent {
    constructor(title?: string, x?: number, y?: number, width?: number, height?: number) {
        super(title, x, y, width, height);
        this.classList.push("ui-kitchen");
        this.type = ComponentType.KITCHEN;
    }
}
export class Bar extends UIComponent {
    constructor(title?: string, x?: number, y?: number, width?: number, height?: number) {
        super(title, x, y, width, height);
        this.classList.push("ui-bar");
        this.type = ComponentType.BAR;
    }
}
export class Receptionist extends UIComponent {
    constructor(title?: string, x?: number, y?: number, width?: number, height?: number) {
        super(title, x, y, width, height);
        this.classList.push("ui-receptionist");
        this.type = ComponentType.RECEPTIONIST;
    }
}
export class Stair extends UIComponent {
    constructor(title?: string, x?: number, y?: number, width?: number, height?: number) {
        super(title, x, y, width, height);
        this.classList.push("ui-stair");
        this.type = ComponentType.STAIR;
    }
}
export class Restrict extends UIComponent {
    constructor(title?: string, x?: number, y?: number, width?: number, height?: number) {
        super(title, x, y, width, height);
        this.classList.push("ui-restrict");
        this.type = ComponentType.RESTRICT;
        this.zIndex = 8;
    }
}
