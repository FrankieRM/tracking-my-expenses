import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { ITransaction, Transaction } from 'app/shared/model/transaction.model';
import { TransactionType } from 'app/shared/model/enumerations/transaction-type.model';

describe('Service Tests', () => {
  describe('Transaction Service', () => {
    let injector: TestBed;
    let service: TransactionService;
    let httpMock: HttpTestingController;
    let elemDefault: ITransaction;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(TransactionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Transaction(0, 0, currentDate, 'AAAAAAA', 'AAAAAAA', TransactionType.INCOME);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            instant: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Transaction', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            instant: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            instant: currentDate
          },
          returnedFromService
        );
        service
          .create(new Transaction(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Transaction', () => {
        const returnedFromService = Object.assign(
          {
            amount: 1,
            instant: currentDate.format(DATE_TIME_FORMAT),
            description: 'BBBBBB',
            observations: 'BBBBBB',
            transactionType: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            instant: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Transaction', () => {
        const returnedFromService = Object.assign(
          {
            amount: 1,
            instant: currentDate.format(DATE_TIME_FORMAT),
            description: 'BBBBBB',
            observations: 'BBBBBB',
            transactionType: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            instant: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Transaction', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
