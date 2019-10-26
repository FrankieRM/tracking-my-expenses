import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISchedule, Schedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from './schedule.service';
import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { INotification } from 'app/shared/model/notification.model';
import { NotificationService } from 'app/entities/notification/notification.service';

@Component({
  selector: 'jhi-schedule-update',
  templateUrl: './schedule-update.component.html'
})
export class ScheduleUpdateComponent implements OnInit {
  isSaving: boolean;

  transactions: ITransaction[];

  notifications: INotification[];
  dueDateDp: any;
  limitDateDp: any;

  editForm = this.fb.group({
    id: [],
    timeUnity: [],
    frecuencyNumber: [],
    dayOfWeek: [],
    sameDay: [],
    frecuencyOrdinalNumber: [],
    dueDate: [],
    limitDate: [null, [Validators.required]],
    scheduleStatus: [],
    transaction: [null, Validators.required],
    notification: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected scheduleService: ScheduleService,
    protected transactionService: TransactionService,
    protected notificationService: NotificationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ schedule }) => {
      this.updateForm(schedule);
    });
    this.transactionService
      .query({ filter: 'schedule-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ITransaction[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITransaction[]>) => response.body)
      )
      .subscribe(
        (res: ITransaction[]) => {
          if (!this.editForm.get('transaction').value || !this.editForm.get('transaction').value.id) {
            this.transactions = res;
          } else {
            this.transactionService
              .find(this.editForm.get('transaction').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ITransaction>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ITransaction>) => subResponse.body)
              )
              .subscribe(
                (subRes: ITransaction) => (this.transactions = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.notificationService
      .query({ filter: 'schedule-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<INotification[]>) => mayBeOk.ok),
        map((response: HttpResponse<INotification[]>) => response.body)
      )
      .subscribe(
        (res: INotification[]) => {
          if (!this.editForm.get('notification').value || !this.editForm.get('notification').value.id) {
            this.notifications = res;
          } else {
            this.notificationService
              .find(this.editForm.get('notification').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<INotification>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<INotification>) => subResponse.body)
              )
              .subscribe(
                (subRes: INotification) => (this.notifications = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(schedule: ISchedule) {
    this.editForm.patchValue({
      id: schedule.id,
      timeUnity: schedule.timeUnity,
      frecuencyNumber: schedule.frecuencyNumber,
      dayOfWeek: schedule.dayOfWeek,
      sameDay: schedule.sameDay,
      frecuencyOrdinalNumber: schedule.frecuencyOrdinalNumber,
      dueDate: schedule.dueDate,
      limitDate: schedule.limitDate,
      scheduleStatus: schedule.scheduleStatus,
      transaction: schedule.transaction,
      notification: schedule.notification
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const schedule = this.createFromForm();
    if (schedule.id !== undefined) {
      this.subscribeToSaveResponse(this.scheduleService.update(schedule));
    } else {
      this.subscribeToSaveResponse(this.scheduleService.create(schedule));
    }
  }

  private createFromForm(): ISchedule {
    return {
      ...new Schedule(),
      id: this.editForm.get(['id']).value,
      timeUnity: this.editForm.get(['timeUnity']).value,
      frecuencyNumber: this.editForm.get(['frecuencyNumber']).value,
      dayOfWeek: this.editForm.get(['dayOfWeek']).value,
      sameDay: this.editForm.get(['sameDay']).value,
      frecuencyOrdinalNumber: this.editForm.get(['frecuencyOrdinalNumber']).value,
      dueDate: this.editForm.get(['dueDate']).value,
      limitDate: this.editForm.get(['limitDate']).value,
      scheduleStatus: this.editForm.get(['scheduleStatus']).value,
      transaction: this.editForm.get(['transaction']).value,
      notification: this.editForm.get(['notification']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchedule>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTransactionById(index: number, item: ITransaction) {
    return item.id;
  }

  trackNotificationById(index: number, item: INotification) {
    return item.id;
  }
}
