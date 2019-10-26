import { Moment } from 'moment';
import { ICategory } from 'app/shared/model/category.model';
import { IWallet } from 'app/shared/model/wallet.model';
import { TransactionType } from 'app/shared/model/enumerations/transaction-type.model';

export interface ITransaction {
  id?: number;
  amount?: number;
  instant?: Moment;
  description?: string;
  observations?: string;
  transactionType?: TransactionType;
  category?: ICategory;
  sourceWallet?: IWallet;
  destinationWallet?: IWallet;
}

export class Transaction implements ITransaction {
  constructor(
    public id?: number,
    public amount?: number,
    public instant?: Moment,
    public description?: string,
    public observations?: string,
    public transactionType?: TransactionType,
    public category?: ICategory,
    public sourceWallet?: IWallet,
    public destinationWallet?: IWallet
  ) {}
}
