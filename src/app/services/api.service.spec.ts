import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
interface User {
  name: string|null;
  avatar_url: string;
  html_url: string;
  location: string|null;
  bio: string|null;
  twitter_username: string|null;
}

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data', () => {
    const mockUser:User = {
    name: 'Prateek kumar singh',
    avatar_url: 'https://avatars.githubusercontent.com/u/113665258?v=4',
    html_url: 'https://github.com/Prateek-singh-06',
    location: 'Tirupati',
    bio: 'Passionate coder exploring new technologies.',
    twitter_username: null
  };
      service.getUser('Prateek-singh-06').subscribe((user) => {
      expect(user).toEqual(mockUser);
      
    });

    const req = httpMock.expectOne('https://api.github.com/users/Prateek-singh-06');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should fetch repos', () => {
    const mockRepos = [{ name:"basic-e-comm-website" , visibility:"public",
              html_url:"https://github.com/Prateek-singh-06/basic-e-comm-website",
              language:"JavaScript",}, { name:"DigitRecognition" , visibility:"public",
              html_url:"https://github.com/Prateek-singh-06/DigitRecognition",
              language:"C++",}];

    service.getrepo(2, 1).subscribe(repos => {
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne('/repos?per_page=2&page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });
});
