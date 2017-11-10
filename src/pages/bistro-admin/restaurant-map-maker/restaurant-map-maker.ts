import { Component, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as interact from "interactjs";
import { UIComponent } from '../../../providers/bistro-admin/classes/ui-component';
import { ComponentFactory } from '../../../providers/bistro-admin/component-factory/component-factory';
@IonicPage()
@Component({
  selector: 'page-restaurant-map-maker',
  templateUrl: 'restaurant-map-maker.html',
})
export class RestaurantMapMakerPage {
  isElementIn = false;
  mapZone: HTMLElement;
  componentFactory: ComponentFactory;
  componentTypes = [
    {
      title: "Khu vực",
      type: "area"
    },
    {
      title: "Bàn",
      type: "table"
    },
    {
      title: "Cửa",
      type: "door"
    },
    {
      title: "Nhà vệ sinh",
      type: "wc"
    },
    {
      title: "Bếp",
      type: "kitchen"
    },
    {
      title: "Quầy bar",
      type: "bar"
    },
    {
      title: "Thu ngân",
      type: "receptionist"
    },
    {
      title: "Cầu thang",
      type: "stair"
    },
    {
      title: "Khu vực cấm",
      type: "restrict"
    },
  ]

  components: Array<UIComponent> = [];
  selectedComponent: UIComponent;
  constructor(public navCtrl: NavController, public domSanitizer: DomSanitizer,
    public navParams: NavParams, public alertCtrl: AlertController, public changeDetectorRef: ChangeDetectorRef) {
    this.componentFactory = new ComponentFactory();
  }

  ionViewDidLoad() {
    this.mapZone = document.getElementById("map-zone");
  }

  ionViewDidEnter() {
    interact('.component-type')
      .draggable({
        // enable inertial throwing
        inertia: false,
        // keep the element within the area of it's parent
        restrict: {
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: (event) => {
          let target = event.target;

          //Add class to target
          target.classList.add('dragging');

          // keep the dragged position in the data-x/data-y attributes
          let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          // translate the element
          target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px) rotateZ(-3deg)';

          // update the posiion attributes
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          this.changeDetectorRef.detectChanges();
        },

        // call this function on every dragend event
        onend: (event) => {
          console.log("onend");
          let target = event.target;
          target.style.webkitTransform =
            target.style.transform = null;
          target.setAttribute('data-x', 0);
          target.setAttribute('data-y', 0);
          target.classList.remove("dragging");
          this.changeDetectorRef.detectChanges();
        }
      })

    interact('#map-zone')
      // .on('doubletap', function (event) {
      //   event.currentTarget.classList.toggle('larger-map');
      //   console.log("double tab", event);
      //   event.preventDefault();
      // })
      .dropzone({
        // only accept elements matching this CSS selector
        accept: '.component-type',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,

        // listen for drop related events:
        ondropactivate: (event) => {
          event.target.classList.add("dragging");
          this.changeDetectorRef.detectChanges();
        },
        ondragenter: (event) => {
          let dropzoneElement = event.target;
          this.isElementIn = true;
          dropzoneElement.classList.add('dragg-entered');
          this.changeDetectorRef.detectChanges();
        },
        ondragleave: (event) => {
          let dropzoneElement = event.target;
          dropzoneElement.classList.remove('dragg-entered');
          this.isElementIn = false;
          this.changeDetectorRef.detectChanges();
        },
        ondrop: (event) => {
          let targetElement = event.target;
          let relateElement = event.relatedTarget;
          let x = relateElement.offsetLeft + parseFloat(relateElement.getAttribute('data-x')) - targetElement.offsetLeft;
          let y = relateElement.offsetTop + parseFloat(relateElement.getAttribute('data-y')) - targetElement.offsetTop;
          if (x < 0) x = 0;
          if (y < 0) y = 0;
          let component = event.relatedTarget.getAttribute("component");
          let uiComponent = this.componentFactory.getComponent(component, "", x, y);

          this.components.push(uiComponent);

          event.target.classList.remove('dragg-entered');
          console.log("ondrop component", this.components, uiComponent);
          this.changeDetectorRef.detectChanges();
        },

        ondropdeactivate: (event) => {
          event.target.classList.remove("dragging");
          this.changeDetectorRef.detectChanges();
        }
      })

    interact('.map-symbol')
      .draggable({
        // enable inertial throwing
        inertia: false,
        // keep the element within the area of it's parent
        restrict: {
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          restriction: "parent"
        },
        onmove: (event) => {
          let target = event.target;
          let index = target.getAttribute('index');
          if (index && this.components[index]) {
            let component = this.components[index];
            this.addElementToArray("dragging", component.classList);
            component.x += event.dx;
            component.y += event.dy;
            this.mapZone.classList.add("dragging");
          }
          this.changeDetectorRef.detectChanges();
        },
        onend: (event) => {
          let target = event.target;
          let index = target.getAttribute('index');
          if (index && this.components[index]) {
            let component = this.components[index];
            this.removeElementFromArray("dragging", component.classList);
            this.mapZone.classList.remove("dragging");
          }
          this.changeDetectorRef.detectChanges();
        }
      })
      .resizable({
        restrict: {
          endOnly: false,
          restriction: "parent"
        },
        preserveAspectRatio: false,
        edges: { left: true, right: true, bottom: true, top: true }
      })
      .on('resizemove', (event) => {
        let target = event.target;
        let index = target.getAttribute('index');
        if (index && this.components[index]) {
          let component = this.components[index];
          this.addElementToArray("dragging", component.classList);
          component.x += event.deltaRect.left;
          component.y += event.deltaRect.top;
          component.width = event.rect.width;
          component.height = event.rect.height;
          this.mapZone.classList.add("dragging");
        }
        this.changeDetectorRef.detectChanges();
      })
      .on('resizeend', (event) => {
        console.log("resizeend")
        let target = event.target;
        let index = target.getAttribute('index');
        if (index && this.components[index]) {
          let component = this.components[index];
          this.removeElementFromArray("dragging", component.classList);
          this.mapZone.classList.remove("dragging");
        }
        this.changeDetectorRef.detectChanges();
      });
  }

  addElementToArray(element: string, array: Array<string>) {
    let index = array.indexOf(element);
    if (index == -1) {
      array.push(element);
    }
    console.log("add", array);
  }

  removeElementFromArray(element: string, array: Array<string>) {
    let index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
    console.log("remove", element, array);
  }

  selectComponent(component: UIComponent) {
    this.selectedComponent = component;
  }

  rotate() {
    this.selectedComponent.doRotate();
  }

  upIndex() {
    this.selectedComponent.upIndex();
  }
  downIndex() {
    this.selectedComponent.downIndex();
  }
  delete() {
    let alert = this.alertCtrl.create({
      message: "Bạn có chắc chắn muốn xóa phần tử: " + (this.selectedComponent.title || this.selectedComponent.typeName),
      buttons: [{
        text: "Cancel",
        role: "cancel"
      }, {
        text: "OK",
        handler: () => {
          let index = this.components.findIndex(elm => {
            return elm.id == this.selectedComponent.id;
          });
          if (index > -1) {
            this.components.splice(index, 1);
            this.selectedComponent = null;
          }
        }
      }]
    })
    alert.present();
  }

  edit() {
    let alert = this.alertCtrl.create({
      title: "Chỉnh sửa phần tử",
      inputs: [
        {
          type: "text",
          label: "Tiêu đề",
          placeholder: "Tiêu đề",
          value: this.selectedComponent.title
        },
        {
          type: "text",
          label: "Độ cao",
          placeholder: "Độ cao",
          value: this.selectedComponent.zIndex + ""
        },
      ],
      buttons: [{
        text: "Cancel",
        role: "cancel"
      }, {
        text: "OK",
        handler: (event) => {
          let index = this.components.findIndex(elm => {
            return elm.id == this.selectedComponent.id;
          });
          if (index > -1 && event) {
            this.selectedComponent.title = event[0];
            this.selectedComponent.zIndex = event[1];
          }
        }
      }]
    })
    alert.present();
  }
}