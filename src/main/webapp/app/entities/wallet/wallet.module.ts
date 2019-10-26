import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TmeSharedModule } from 'app/shared/shared.module';
import { WalletComponent } from './wallet.component';
import { WalletDetailComponent } from './wallet-detail.component';
import { WalletUpdateComponent } from './wallet-update.component';
import { WalletDeletePopupComponent, WalletDeleteDialogComponent } from './wallet-delete-dialog.component';
import { walletRoute, walletPopupRoute } from './wallet.route';

const ENTITY_STATES = [...walletRoute, ...walletPopupRoute];

@NgModule({
  imports: [TmeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [WalletComponent, WalletDetailComponent, WalletUpdateComponent, WalletDeleteDialogComponent, WalletDeletePopupComponent],
  entryComponents: [WalletDeleteDialogComponent]
})
export class TmeWalletModule {}
