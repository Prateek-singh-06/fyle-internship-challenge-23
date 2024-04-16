import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError,BehaviorSubject,of } from 'rxjs';

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

  getUser(githubUsername: string|null) {
    this.url="https://api.github.com/users/"+githubUsername;
    
    console.log(githubUsername);
    return this.httpClient.get(this.url);
  }
  changeUserData(data: any) {
    this.userData.next(data);
  }

  getrepo(repoPerPage:number|null,pageNO:number|null){
    
    const cachedResponse = this.cache.get(`${this.url}/repos?per_page=${repoPerPage}&page=${pageNO}`);
    if(cachedResponse)
      {
        return of(cachedResponse);
      }
    return this.httpClient.get(`${this.url}/repos?per_page=${repoPerPage}&page=${pageNO}`).pipe(tap(response=>this.cache.set(`${this.url}/repos?per_page=${repoPerPage}&page=${pageNO}`,response)));
  }
  changeRepo(data:any){
    this.repos.next(data);
  }

  
}
