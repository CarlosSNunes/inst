import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroComponent } from './erro.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErroComponent', () => {
    let component: ErroComponent;
    let fixture: ComponentFixture<ErroComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ErroComponent
            ],
            imports: [
                RouterTestingModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
