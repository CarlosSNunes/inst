import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusNetworkComponent } from './plus-network.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlusNetworkComponent', () => {
  let component: PlusNetworkComponent;
  let fixture: ComponentFixture<PlusNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlusNetworkComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
