import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError,BehaviorSubject,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface GithubUser {
  name: string|null;
  avatar_url: string;
  html_url: string;
  location: string|null;
  bio: string|null;
  twitter_username: string|null;
}
interface Repo {
    name: string;
    visibility: string;
    html_url: string;
    language: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private userData =new BehaviorSubject<any>(null);
  currentUserData = this.userData.asObservable();
  private repos=new BehaviorSubject<any>(null);
  currentrepos=this.repos.asObservable();
  url=""
  private cache=new Map<string,any>();

  constructor(
    private httpClient: HttpClient
  ) { }

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
  changeUserData(data: any) {
    this.userData.next(data);
    // console.log(data);
  }

  getrepo(repoPerPage:number|null,pageNO:number|null){
    
    const cachedResponse = this.cache.get(`${this.url}/repos?per_page=${repoPerPage}&page=${pageNO}`);
    if(cachedResponse)
      {
        return of(cachedResponse);
      }
    return this.httpClient.get(`${this.url}/repos?per_page=${repoPerPage}&page=${pageNO}`).pipe(
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
        console.log(response);
        this.cache.set(`${this.url}/repos?per_page=${repoPerPage}&page=${pageNO}`,response)}));
  }
  changeRepo(data:any){
    this.repos.next(data);
  }

  
}
