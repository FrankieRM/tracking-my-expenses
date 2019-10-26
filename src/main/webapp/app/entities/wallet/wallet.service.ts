import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWallet } from 'app/shared/model/wallet.model';

type EntityResponseType = HttpResponse<IWallet>;
type EntityArrayResponseType = HttpResponse<IWallet[]>;

@Injectable({ providedIn: 'root' })
export class WalletService {
  public resourceUrl = SERVER_API_URL + 'api/wallets';

  constructor(protected http: HttpClient) {}

  create(wallet: IWallet): Observable<EntityResponseType> {
    return this.http.post<IWallet>(this.resourceUrl, wallet, { observe: 'response' });
  }

  update(wallet: IWallet): Observable<EntityResponseType> {
    return this.http.put<IWallet>(this.resourceUrl, wallet, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWallet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWallet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
