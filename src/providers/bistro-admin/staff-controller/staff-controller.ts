import { Injectable } from '@angular/core';
import { Staff } from "../classes/staff";

import { Subject } from 'rxjs/Subject';

@Injectable()
export class StaffControllerProvider {
  Staffs: Array<Staff> = [];
  private StaffSubject = new Subject<Array<Staff>>();
  public dataChange = this.StaffSubject.asObservable();

  constructor() {
  }

  updateData(data) {
    this.resetData();
    if (data && data.length) {
      for (let staff of data) {
        let temStaff = new Staff(staff["rest_id"], staff["staff_id"], staff["staff_name"], staff["staff_email"], +staff["staff_status"], staff["role_id"]);
        this.Staffs.push(temStaff);
      }
      this.broadcastChange(this.Staffs);
    }
  }

  broadcastChange(data) {
    this.StaffSubject.next(data);
    console.log("hey your Staff changed", data);
  }

  resetData() {
    this.Staffs = [];
  }

  getAllStaff(): Array<Staff> {
    return this.Staffs;
  }

  getStaffFromData(data) {
    if (!data) return null;
  }
}
