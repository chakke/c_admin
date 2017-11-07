import { Role } from './role';

export class Staff {
    restId: number;
    id: number;
    name: string;
    email: string;
    status: number;
    role: Role;
    constructor(restId: number, id: number, name: string, email: string, status?: number, role?: Role) {
        this.restId = restId;
        this.id = id;
        this.name = name;
        this.email = email;
        this.status = (status ? status : 0);
        this.role = (role ? role : new Role(0, "Nhân viên"));
    } 
}