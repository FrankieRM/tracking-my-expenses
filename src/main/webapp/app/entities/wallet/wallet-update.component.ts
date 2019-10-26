import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IWallet, Wallet } from 'app/shared/model/wallet.model';
import { WalletService } from './wallet.service';

@Component({
  selector: 'jhi-wallet-update',
  templateUrl: './wallet-update.component.html'
})
export class WalletUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    walletType: [null, [Validators.required]]
  });

  constructor(protected walletService: WalletService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ wallet }) => {
      this.updateForm(wallet);
    });
  }

  updateForm(wallet: IWallet) {
    this.editForm.patchValue({
      id: wallet.id,
      description: wallet.description,
      walletType: wallet.walletType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const wallet = this.createFromForm();
    if (wallet.id !== undefined) {
      this.subscribeToSaveResponse(this.walletService.update(wallet));
    } else {
      this.subscribeToSaveResponse(this.walletService.create(wallet));
    }
  }

  private createFromForm(): IWallet {
    return {
      ...new Wallet(),
      id: this.editForm.get(['id']).value,
      description: this.editForm.get(['description']).value,
      walletType: this.editForm.get(['walletType']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWallet>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
