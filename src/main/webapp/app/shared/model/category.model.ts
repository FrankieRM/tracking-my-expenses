import { TransactionType } from 'app/shared/model/enumerations/transaction-type.model';

export interface ICategory {
  id?: number;
  description?: string;
  transactionType?: TransactionType;
}

export class Category implements ICategory {
  constructor(public id?: number, public description?: string, public transactionType?: TransactionType) {}
}
