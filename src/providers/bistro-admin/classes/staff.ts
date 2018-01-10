import { Role } from './role';
import {Mappingable} from '../interface/mappingable';
import { STAFF_ROLE_NAME } from '../app-constant';

export class Staff implements Mappingable {
    accountState: number;
    avatar: string;
    birthDay: Date;
    email: string; 
    firebaseId: string;
    firebaseReference: string;
    id: string;
    identify: string;
    name: string;
    phone: string;
    staffRole: number;
    staffType: number;
    userName: string;
    //filed only in client
    staffRoleName: string;
    staffTypeName: string;
    constructor() {
        this.reset();
    }

    reset() {
        this.accountState = 0;
        this.avatar = "";
        this.birthDay = null;
        this.email = "";
        this.firebaseId = "";
        this.firebaseReference = "";
        this.id = "";
        this.identify = "";
        this.name = "";
        this.phone = "";
        this.staffRole = 0;
        this.staffType = 0;
        this.userName = "";
        this.staffRoleName = "";
        this.staffTypeName = "";
    }

    mappingFirebaseData(data) {
        if (data) {
            this.accountState = data.account_state;
            this.avatar = data.avatar;
            this.birthDay = data.birthday;
            this.email = data.email;
            this.firebaseId = data.firebase_id;
            this.firebaseReference = data.firebase_reference;
            this.id = data.id;
            this.identify = data.identify;
            this.name = data.name;
            this.phone = data.phone;
            this.staffRole = data.staff_role;
            this.staffType = data.staff_type;
            this.userName = data.user_name;
            this.staffRoleName = STAFF_ROLE_NAME[data.staff_role];
            this.staffTypeName = STAFF_ROLE_NAME[data.staff_type];
        }
    }
}