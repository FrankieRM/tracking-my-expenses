import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TmeSharedModule } from 'app/shared/shared.module';
import { ScheduleComponent } from './schedule.component';
import { ScheduleDetailComponent } from './schedule-detail.component';
import { ScheduleUpdateComponent } from './schedule-update.component';
import { ScheduleDeletePopupComponent, ScheduleDeleteDialogComponent } from './schedule-delete-dialog.component';
import { scheduleRoute, schedulePopupRoute } from './schedule.route';

const ENTITY_STATES = [...scheduleRoute, ...schedulePopupRoute];

@NgModule({
  imports: [TmeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ScheduleComponent,
    ScheduleDetailComponent,
    ScheduleUpdateComponent,
    ScheduleDeleteDialogComponent,
    ScheduleDeletePopupComponent
  ],
  entryComponents: [ScheduleDeleteDialogComponent]
})
export class TmeScheduleModule {}
