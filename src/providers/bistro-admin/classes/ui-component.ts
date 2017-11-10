import { Utils } from "../../app-utils";
import { AlertController } from 'ionic-angular';

var id: number = 0;
export class UIComponent {
    id: number;
    title: string;
    type: string;
    typeName: string;
    classList: Array<string> = [];
    innerHtml: string;
    width: number;
    height: number;
    x: number;
    y: number;
    zIndex = 10;
    rotate: number = 0;
    constructor(title?: string, x?: number, y?: number) {
        id++;
        this.id = id;
        this.type = "component";
        this.typeName = "";
        this.classList.push("map-symbol");
        this.innerHtml = "";
        this.title = title ? title : "";
        this.width = 50;
        this.height = 50;
        this.x = (x ? x : 0);
        this.y = (y ? y : 0);
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
    constructor(title?: string, x?: number, y?: number) {
        super(title, x, y);
        this.classList.push("ui-area");
        this.type = "area";
        this.typeName = "Khu vực";
        this.width = 100;
        this.height = 100;
        this.zIndex = 9;
    }
}
export class Table extends UIComponent {
    constructor(title?: string, x?: number, y?: number) {
        super(title, x, y);
        this.classList.push("ui-table");
        this.type = "table";
        this.typeName = "Bàn";
    }
}
export class Door extends UIComponent {
    constructor(title?: string, x?: number, y?: number) {
        super(title, x, y);
        this.classList.push("ui-door");
        this.type = "door";
        this.typeName = "Cửa";
        this.height = 30;
        this.innerHtml = `<div class="barrier left"> </div>
                        <div class="part left"></div>
                        <div class="part right"></div>
                        <div class="barrier right"></div>`;
    }
}
export class WC extends UIComponent {
    constructor(title?: string, x?: number, y?: number) {
        super(title, x, y);
        this.classList.push("ui-wc");
        this.type = "wc";
        this.typeName = "Nhà vệ sinh";
    }
}
export class Kitchen extends UIComponent {
    constructor(title?: string, x?: number, y?: number) {
        super(title, x, y);
        this.classList.push("ui-kitchen");
        this.type = "kitchen";
        this.typeName = "Bếp";
    }
}
export class Bar extends UIComponent {
    constructor(title?: string, x?: number, y?: number) {
        super(title, x, y);
        this.classList.push("ui-bar");
        this.type = "bar";
        this.typeName = "Quầy bar";
    }
}
export class Receptionist extends UIComponent {
    constructor(title?: string, x?: number, y?: number) {
        super(title, x, y);
        this.classList.push("ui-receptionist");
        this.type = "receptionist";
        this.typeName = "Thu ngân";
    }
}
export class Stair extends UIComponent {
    constructor(title?: string, x?: number, y?: number) {
        super(title, x, y);
        this.classList.push("ui-stair");
        this.type = "stair";
        this.typeName = "Cầu thang";
    }
}
export class Restrict extends UIComponent {
    constructor(title?: string, x?: number, y?: number) {
        super(title, x, y);
        this.classList.push("ui-restrict");
        this.type = "restrict";
        this.typeName = "Khu vực cấm";
        this.zIndex = 8;
    }
}
