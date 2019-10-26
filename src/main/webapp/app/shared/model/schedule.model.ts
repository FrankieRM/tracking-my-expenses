import { Moment } from 'moment';
import { ITransaction } from 'app/shared/model/transaction.model';
import { INotification } from 'app/shared/model/notification.model';
import { TimeUnity } from 'app/shared/model/enumerations/time-unity.model';
import { ScheduleStatus } from 'app/shared/model/enumerations/schedule-status.model';

export interface ISchedule {
  id?: number;
  timeUnity?: TimeUnity;
  frecuencyNumber?: number;
  dayOfWeek?: string;
  sameDay?: boolean;
  frecuencyOrdinalNumber?: string;
  dueDate?: Moment;
  limitDate?: Moment;
  scheduleStatus?: ScheduleStatus;
  transaction?: ITransaction;
  notification?: INotification;
}

export class Schedule implements ISchedule {
  constructor(
    public id?: number,
    public timeUnity?: TimeUnity,
    public frecuencyNumber?: number,
    public dayOfWeek?: string,
    public sameDay?: boolean,
    public frecuencyOrdinalNumber?: string,
    public dueDate?: Moment,
    public limitDate?: Moment,
    public scheduleStatus?: ScheduleStatus,
    public transaction?: ITransaction,
    public notification?: INotification
  ) {
    this.sameDay = this.sameDay || false;
  }
}
