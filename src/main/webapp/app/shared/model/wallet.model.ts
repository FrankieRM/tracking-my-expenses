import { WalletType } from 'app/shared/model/enumerations/wallet-type.model';

export interface IWallet {
  id?: number;
  description?: string;
  walletType?: WalletType;
}

export class Wallet implements IWallet {
  constructor(public id?: number, public description?: string, public walletType?: WalletType) {}
}
