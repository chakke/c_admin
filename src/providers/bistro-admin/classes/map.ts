import { UIComponent } from "./ui-component";
import { ComponentFactory } from "../factories/component-factory/component-factory";
export class Map {
    private id: number;
    components: Array<UIComponent> = [];
    private componentFactory: ComponentFactory;
    private numberOfElement: any = {};
    private currentWidth: number = 0;
    private currentHeight: number = 0;

    constructor(id: number) {
        this.id = id;
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

    getId() {
        return this.id;
    }

    getNumberOfElement() {
        return this.numberOfElement;
    }

    setWidth(width: number) {
        this.currentWidth = width;
    }

    setHeight(height: number) {
        this.currentHeight = height;
    }

    getWidth() {
        return this.currentWidth;
    }

    getHeight() {
        return this.currentHeight;
    }
}