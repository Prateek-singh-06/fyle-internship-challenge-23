
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RepoComponent } from './repo.component';
import { ApiService } from '../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

describe('RepoComponent', () => {
  let component: RepoComponent;
  let fixture: ComponentFixture<RepoComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    const apiServiceMock = {
      getrepo: jasmine.createSpy('getrepo').and.returnValue(of([])),
      changeRepo: jasmine.createSpy('changeRepo'),
      currentrepos: of([])
    };

    await TestBed.configureTestingModule({
      declarations: [ RepoComponent ],
      providers: [ { provide: ApiService, useValue: apiServiceMock } ],
      imports: [ ReactiveFormsModule ,FormsModule ]
    })
    .compileComponents();

    apiService = TestBed.inject(ApiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch repos when onNextClicked is called', () => {
    component.pageNumber=2;
    component.onNextClicked();

    expect(apiService.getrepo).toHaveBeenCalledWith(component.selectedNumber, component.pageNumber+1);
  });

  it('should fetch repos when onPreviousClicked is called', () => {
    component.pageNumber = 2; // Set pageNumber to 2 so that onPreviousClicked can be called
    component.onPreviousClicked();

    expect(apiService.getrepo).toHaveBeenCalledWith(component.selectedNumber, component.pageNumber);
  });

  it('should fetch repos when onOptionChange is called', () => {
    component.onOptionChange(null);

    expect(apiService.getrepo).toHaveBeenCalledWith(component.selectedNumber, component.pageNumber);
  });

  it('should update allrepoData when currentrepos emits', () => {
    const repoData = [
      { name: 'test-repo', visibility: 'public', html_url: 'test-url', language: 'JavaScript' }
    ];
    apiService.currentrepos = of(repoData);
    component.ngOnInit();

    expect(component.allrepoData).toEqual(repoData);
  });
});
