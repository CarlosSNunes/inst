import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightPostComponent } from './highlight-post.component';

describe('HighlightPostComponent', () => {
    let component: HighlightPostComponent;
    let fixture: ComponentFixture<HighlightPostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HighlightPostComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HighlightPostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
