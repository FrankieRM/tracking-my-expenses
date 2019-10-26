export interface INotification {
  id?: number;
  sameDay?: boolean;
  beforeDays?: number;
}

export class Notification implements INotification {
  constructor(public id?: number, public sameDay?: boolean, public beforeDays?: number) {
    this.sameDay = this.sameDay || false;
  }
}
