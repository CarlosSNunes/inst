import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreirasComponent } from './carreiras.component';

describe('CarreirasComponent', () => {
    let component: CarreirasComponent;
    let fixture: ComponentFixture<CarreirasComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CarreirasComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CarreirasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
