
import { UIComponent, Area, Bar, Door, Kitchen, Receptionist, Stair, Table, WC, Restrict } from "../classes/ui-component";

export class ComponentFactory {
    public getComponent(component: string, title?: string, x?: number, y?: number): UIComponent {
        if (component) {
            switch (component.toLocaleLowerCase()) {
                case "area": return new Area(title, x, y);
                case "bar": return new Bar(title, x, y);
                case "door": return new Door(title, x, y);
                case "kitchen": return new Kitchen(title, x, y);
                case "receptionist": return new Receptionist(title, x, y);
                case "stair": return new Stair(title, x, y);
                case "table": return new Table(title, x, y);
                case "wc": return new WC(title, x, y);
                case "restrict": return new Restrict(title, x, y);
            }
        }
        return new Area(title, x, y);;
    }
}