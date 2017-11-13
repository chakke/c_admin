import { UIComponent } from "./ui-component";
import { ComponentFactory } from "../component-factory/component-factory";

export class Floor {
    components: Array<UIComponent> = [];
    componentFactory: ComponentFactory;
    numberOfElement: any = {};

    constructor() {
        this.componentFactory = new ComponentFactory();
    }

    addComponent(type: string, title?: string, x?: number, y?: number, width?: number, height?: number) {
        let component = this.componentFactory.getComponent(type, title, x, y, width, height);
        if (this.numberOfElement[type]) {
            this.numberOfElement[type] += 1;
        } else {
            this.numberOfElement[type] = 1;
        }

        if (title === null || title === undefined) {
            component.title = component.type.name + " " + this.numberOfElement[type];
        }

        this.components.push(component);
    }
}