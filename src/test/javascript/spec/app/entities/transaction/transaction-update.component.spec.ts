import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TmeTestModule } from '../../../test.module';
import { TransactionUpdateComponent } from 'app/entities/transaction/transaction-update.component';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { Transaction } from 'app/shared/model/transaction.model';

describe('Component Tests', () => {
  describe('Transaction Management Update Component', () => {
    let comp: TransactionUpdateComponent;
    let fixture: ComponentFixture<TransactionUpdateComponent>;
    let service: TransactionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TmeTestModule],
        declarations: [TransactionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TransactionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransactionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Transaction(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Transaction();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
