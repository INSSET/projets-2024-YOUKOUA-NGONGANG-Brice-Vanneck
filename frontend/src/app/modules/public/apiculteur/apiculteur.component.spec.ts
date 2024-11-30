import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiculteurComponent } from './apiculteur.component';

describe('ApiculteurComponent', () => {
  let component: ApiculteurComponent;
  let fixture: ComponentFixture<ApiculteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiculteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
