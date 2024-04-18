import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap,BehaviorSubject,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//define the githubUser Interface
interface GithubUser {
  name: string|null;
  avatar_url: string;
  html_url: string;
  location: string|null;
  bio: string|null;
  twitter_username: string|null;
}

// Define the Repo interface
interface Repo {
    name: string;
    visibility: string;
    html_url: string;
    language: string|null;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Define BehaviorSubjects for user data and repositories
  private userData =new BehaviorSubject<any>(null);
  currentUserData = this.userData.asObservable();
  private repos=new BehaviorSubject<any>(null);
  currentrepos=this.repos.asObservable();

  url=""
  private cache=new Map<string,any>();

  constructor(
    private httpClient: HttpClient
  ) { }

  // Function to get user data from Github API
  getUser(githubUsername: string|null): Observable<GithubUser> {
  this.url="https://api.github.com/users/"+githubUsername;
  return this.httpClient.get(this.url).pipe(
    map((response: any): GithubUser => ({
      name: response.name,
      avatar_url: response.avatar_url,
      html_url: response.html_url,
      location: response.location,
      bio: response.bio,
      twitter_username: response.twitter_username
    }))
  );
}

// Function to update user data
changeUserData(data: any) {
  this.userData.next(data);
}

// Function to get repository data from Github API with caching
  getrepo(repoPerPage:number|null,pageNo:number|null){
  const repoUrl = `${this.url}/repos?per_page=${repoPerPage}&page=${pageNo}`;    
    const cachedResponse = this.cache.get(repoUrl);
    if(cachedResponse)
      {
        return of(cachedResponse);
      }
    return this.httpClient.get(repoUrl).pipe(
      map((data:any)=>{
        
        return data.map((item:Repo)=>{
         
            return {
              name:item.name,
              visibility:item.visibility,
              html_url:item.html_url,
              language:item.language,

            }
          
        })
      }),
      tap(response=>{
        this.cache.set(repoUrl,response)}));
  }
  
  // Function to update repository data
  changeRepo(data:any){
    this.repos.next(data);
  }

  
}
