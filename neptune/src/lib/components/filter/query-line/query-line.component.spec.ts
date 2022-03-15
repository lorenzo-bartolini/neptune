import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryLineComponent } from './query-line.component';

describe('QueryLineComponent', () => {
  let component: QueryLineComponent;
  let fixture: ComponentFixture<QueryLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
