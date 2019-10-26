import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TmeSharedModule } from 'app/shared/shared.module';
import { NotificationComponent } from './notification.component';
import { NotificationDetailComponent } from './notification-detail.component';
import { NotificationUpdateComponent } from './notification-update.component';
import { NotificationDeletePopupComponent, NotificationDeleteDialogComponent } from './notification-delete-dialog.component';
import { notificationRoute, notificationPopupRoute } from './notification.route';

const ENTITY_STATES = [...notificationRoute, ...notificationPopupRoute];

@NgModule({
  imports: [TmeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NotificationComponent,
    NotificationDetailComponent,
    NotificationUpdateComponent,
    NotificationDeleteDialogComponent,
    NotificationDeletePopupComponent
  ],
  entryComponents: [NotificationDeleteDialogComponent]
})
export class TmeNotificationModule {}
