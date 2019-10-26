import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ScheduleService } from 'app/entities/schedule/schedule.service';
import { ISchedule, Schedule } from 'app/shared/model/schedule.model';
import { TimeUnity } from 'app/shared/model/enumerations/time-unity.model';
import { ScheduleStatus } from 'app/shared/model/enumerations/schedule-status.model';

describe('Service Tests', () => {
  describe('Schedule Service', () => {
    let injector: TestBed;
    let service: ScheduleService;
    let httpMock: HttpTestingController;
    let elemDefault: ISchedule;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ScheduleService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Schedule(0, TimeUnity.DAYS, 0, 'AAAAAAA', false, 'AAAAAAA', currentDate, currentDate, ScheduleStatus.SCHEDULED);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dueDate: currentDate.format(DATE_FORMAT),
            limitDate: currentDate.format(DATE_FORMAT)
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

      it('should create a Schedule', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dueDate: currentDate.format(DATE_FORMAT),
            limitDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dueDate: currentDate,
            limitDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new Schedule(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Schedule', () => {
        const returnedFromService = Object.assign(
          {
            timeUnity: 'BBBBBB',
            frecuencyNumber: 1,
            dayOfWeek: 'BBBBBB',
            sameDay: true,
            frecuencyOrdinalNumber: 'BBBBBB',
            dueDate: currentDate.format(DATE_FORMAT),
            limitDate: currentDate.format(DATE_FORMAT),
            scheduleStatus: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dueDate: currentDate,
            limitDate: currentDate
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

      it('should return a list of Schedule', () => {
        const returnedFromService = Object.assign(
          {
            timeUnity: 'BBBBBB',
            frecuencyNumber: 1,
            dayOfWeek: 'BBBBBB',
            sameDay: true,
            frecuencyOrdinalNumber: 'BBBBBB',
            dueDate: currentDate.format(DATE_FORMAT),
            limitDate: currentDate.format(DATE_FORMAT),
            scheduleStatus: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dueDate: currentDate,
            limitDate: currentDate
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

      it('should delete a Schedule', () => {
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
