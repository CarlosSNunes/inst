import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplusPlusComponent } from './careplus-plus.component';

describe('CareplusPlusComponent', () => {
    let component: CareplusPlusComponent;
    let fixture: ComponentFixture<CareplusPlusComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CareplusPlusComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CareplusPlusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
