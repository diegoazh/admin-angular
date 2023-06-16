import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { of } from 'rxjs';

import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      imports: [BreadcrumbModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: of({
            url: '',
            params: {},
            queryParams: {},
            fragment: '',
            data: {},
            outlet: '',
            component: null,
            snapshot: '',
            title: '',
          }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
