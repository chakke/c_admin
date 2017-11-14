
import { UIComponent, Area, Bar, Door, Kitchen, Receptionist, Stair, Table, WC, Restrict } from "../../classes/ui-component";
import { ComponentType } from "../../app-constant";

export class ComponentFactory {
    public getComponent(componentType: string, title?: string, x?: number, y?: number, width?: number, height?: number): UIComponent {
        console.log("factory get component", width, height)
        
        if (componentType) {
            switch (componentType.toLocaleLowerCase()) {
                case ComponentType.AREA.type: return new Area(title, x, y, width, height);
                case ComponentType.BAR.type: return new Bar(title, x, y, width, height);
                case ComponentType.DOOR.type: return new Door(title, x, y, width, height);
                case ComponentType.KITCHEN.type: return new Kitchen(title, x, y, width, height);
                case ComponentType.RECEPTIONIST.type: return new Receptionist(title, x, y, width, height);
                case ComponentType.STAIR.type: return new Stair(title, x, y, width, height);
                case ComponentType.TABLE.type: return new Table(title, x, y, width, height);
                case ComponentType.WC.type: return new WC(title, x, y, width, height);
                case ComponentType.RESTRICT.type: return new Restrict(title, x, y, width, height);
            }
        }
        return new Area(title, x, y, width, height);;
    }
}