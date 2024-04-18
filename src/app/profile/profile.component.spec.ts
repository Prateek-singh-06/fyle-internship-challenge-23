
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProfileComponent } from './profile.component';
import { ApiService } from '../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    const apiServiceMock = {
      getUser: jasmine.createSpy('getUser').and.returnValue(of(null)),
      getrepo: jasmine.createSpy('getrepo').and.returnValue(of(null)),
      changeUserData: jasmine.createSpy('changeUserData'),
      changeRepo: jasmine.createSpy('changeRepo'),
      currentUserData: of(null)
    };

    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [ { provide: ApiService, useValue: apiServiceMock } ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();

    apiService = TestBed.inject(ApiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data and repos when form is submitted', () => {
    component.form.controls.name.setValue('Prateek-singh-06');
    component.onSubmit();

    expect(apiService.getUser).toHaveBeenCalledWith('Prateek-singh-06');
    expect(apiService.getrepo).toHaveBeenCalledWith(10, 1);
  });

  it('should update userData when currentUserData emits', () => {
    const userData = {
      name: 'Prateek kumar singh',
      bio: "Passionate coder exploring new technologies.",
      location: "Tirupati",
      avatar_url: "https://avatars.githubusercontent.com/u/113665258?v=4",
      html_url: "https://github.com/Prateek-singh-06",
      twitter_username:null,
    };
    apiService.currentUserData = of(userData);
    component.ngOnInit();

    expect(component.userData).toEqual(userData);
  });
});

