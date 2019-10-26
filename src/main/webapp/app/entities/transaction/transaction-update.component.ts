import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITransaction, Transaction } from 'app/shared/model/transaction.model';
import { TransactionService } from './transaction.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';
import { IWallet } from 'app/shared/model/wallet.model';
import { WalletService } from 'app/entities/wallet/wallet.service';

@Component({
  selector: 'jhi-transaction-update',
  templateUrl: './transaction-update.component.html'
})
export class TransactionUpdateComponent implements OnInit {
  isSaving: boolean;

  categories: ICategory[];

  sourcewallets: IWallet[];

  destinationwallets: IWallet[];

  editForm = this.fb.group({
    id: [],
    amount: [null, [Validators.required]],
    instant: [null, [Validators.required]],
    description: [],
    observations: [],
    transactionType: [null, [Validators.required]],
    category: [null, Validators.required],
    sourceWallet: [null, Validators.required],
    destinationWallet: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected transactionService: TransactionService,
    protected categoryService: CategoryService,
    protected walletService: WalletService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ transaction }) => {
      this.updateForm(transaction);
    });
    this.categoryService
      .query({ filter: 'transaction-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe(
        (res: ICategory[]) => {
          if (!this.editForm.get('category').value || !this.editForm.get('category').value.id) {
            this.categories = res;
          } else {
            this.categoryService
              .find(this.editForm.get('category').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICategory>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICategory>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICategory) => (this.categories = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.walletService
      .query({ filter: 'transaction-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IWallet[]>) => mayBeOk.ok),
        map((response: HttpResponse<IWallet[]>) => response.body)
      )
      .subscribe(
        (res: IWallet[]) => {
          if (!this.editForm.get('sourceWallet').value || !this.editForm.get('sourceWallet').value.id) {
            this.sourcewallets = res;
          } else {
            this.walletService
              .find(this.editForm.get('sourceWallet').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IWallet>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IWallet>) => subResponse.body)
              )
              .subscribe(
                (subRes: IWallet) => (this.sourcewallets = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.walletService
      .query({ filter: 'transaction-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IWallet[]>) => mayBeOk.ok),
        map((response: HttpResponse<IWallet[]>) => response.body)
      )
      .subscribe(
        (res: IWallet[]) => {
          if (!this.editForm.get('destinationWallet').value || !this.editForm.get('destinationWallet').value.id) {
            this.destinationwallets = res;
          } else {
            this.walletService
              .find(this.editForm.get('destinationWallet').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IWallet>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IWallet>) => subResponse.body)
              )
              .subscribe(
                (subRes: IWallet) => (this.destinationwallets = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(transaction: ITransaction) {
    this.editForm.patchValue({
      id: transaction.id,
      amount: transaction.amount,
      instant: transaction.instant != null ? transaction.instant.format(DATE_TIME_FORMAT) : null,
      description: transaction.description,
      observations: transaction.observations,
      transactionType: transaction.transactionType,
      category: transaction.category,
      sourceWallet: transaction.sourceWallet,
      destinationWallet: transaction.destinationWallet
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const transaction = this.createFromForm();
    if (transaction.id !== undefined) {
      this.subscribeToSaveResponse(this.transactionService.update(transaction));
    } else {
      this.subscribeToSaveResponse(this.transactionService.create(transaction));
    }
  }

  private createFromForm(): ITransaction {
    return {
      ...new Transaction(),
      id: this.editForm.get(['id']).value,
      amount: this.editForm.get(['amount']).value,
      instant: this.editForm.get(['instant']).value != null ? moment(this.editForm.get(['instant']).value, DATE_TIME_FORMAT) : undefined,
      description: this.editForm.get(['description']).value,
      observations: this.editForm.get(['observations']).value,
      transactionType: this.editForm.get(['transactionType']).value,
      category: this.editForm.get(['category']).value,
      sourceWallet: this.editForm.get(['sourceWallet']).value,
      destinationWallet: this.editForm.get(['destinationWallet']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransaction>>) {
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

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }

  trackWalletById(index: number, item: IWallet) {
    return item.id;
  }
}
