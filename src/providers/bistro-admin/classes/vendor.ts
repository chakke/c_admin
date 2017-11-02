import { User } from './user';
import { Province } from './province';

export class Vendor {
    owner: User;
    name: string;
    description: string;
    logo: string;
    email: string;
    phone: string;
    address: string;
    province: Province;
    constructor(owner: User, name: string, description?: string, logo?: string,
        email?: string, phone?: string, address?: string, province?: Province) {
        this.owner = owner;
        this.name = name;
        this.description = (description ? description : "");
        this.logo = (logo ? logo : "");
        this.email = (email ? email : "");
        this.phone = (phone ? phone : "");
        this.address = (address ? address : "");
        this.province = (province ? province : new Province(0, ""));
    }
}
