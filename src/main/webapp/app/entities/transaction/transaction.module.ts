import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TmeSharedModule } from 'app/shared/shared.module';
import { TransactionComponent } from './transaction.component';
import { TransactionDetailComponent } from './transaction-detail.component';
import { TransactionUpdateComponent } from './transaction-update.component';
import { TransactionDeletePopupComponent, TransactionDeleteDialogComponent } from './transaction-delete-dialog.component';
import { transactionRoute, transactionPopupRoute } from './transaction.route';

const ENTITY_STATES = [...transactionRoute, ...transactionPopupRoute];

@NgModule({
  imports: [TmeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TransactionComponent,
    TransactionDetailComponent,
    TransactionUpdateComponent,
    TransactionDeleteDialogComponent,
    TransactionDeletePopupComponent
  ],
  entryComponents: [TransactionDeleteDialogComponent]
})
export class TmeTransactionModule {}
