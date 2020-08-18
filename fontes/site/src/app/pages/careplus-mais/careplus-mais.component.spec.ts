import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplusMaisComponent } from './careplus-mais.component';

describe('CareplusMaisComponent', () => {
    let component: CareplusMaisComponent;
    let fixture: ComponentFixture<CareplusMaisComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CareplusMaisComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CareplusMaisComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
