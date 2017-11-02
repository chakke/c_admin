import { LatLng } from "./latlng";
import { Vendor } from "./vendor";
import { Province } from "./province";
import { Banner } from "./banner";
import { Table } from "./table";
import { WorkingTime } from "./working-time";

export class Restaurant {
    id: number;
    vendor: Vendor;
    name: string;
    email: string;
    description: string;
    address: string;
    city: Province;
    phone: string;
    latLng: LatLng;
    offerDelivery: number;
    deliveryTime: number;
    option: string;
    image: string;
    banners: Array<Banner>;
    tables: Array<Table>;
    workingHours: Array<WorkingTime>;

    constructor(
        id: number,
        vendor: Vendor,
        name: string,
        email: string,
        description?: string,
        address?: string,
        city?: Province,
        phone?: string,
        latLng?: LatLng,
        offerDelivery?: number,
        deliveryTime?: number,
        option?: string,
        image?: string,
        banners?: Array<Banner>,
        tables?: Array<Table>,
        workingHours?: Array<WorkingTime>
    ) {
        this.id = id;
        this.vendor = vendor;
        this.name = name;
        this.email = email;
        this.description = description ? description : "";
        this.address = address ? address : "";
        this.city = city ? city : new Province(0, "Hà Nội");
        this.phone = phone ? phone : "";
        this.latLng = latLng ? latLng : new LatLng(0, 0);
        this.offerDelivery = offerDelivery ? offerDelivery : 0;
        this.deliveryTime = deliveryTime ? deliveryTime : 15;
        this.option = option ? option : "";
        this.image = image ? image : "";
        this.banners = banners ? banners : [];
        this.tables = tables ? tables : [];
        this.workingHours = workingHours ? workingHours : [];
    }
}