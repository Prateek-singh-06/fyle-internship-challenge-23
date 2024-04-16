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
    const headers = { 'Authorization': 'Bearer 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'};
    console.log(githubUsername);
    return this.httpClient.get(this.url,{headers});
  }
  changeUserData(data: any) {
    this.userData.next(data);
    // console.log(data);
  }

  getrepo(repoPerPage:number|null,pageNO:number|null){
    // console.log("called");
    const headers = { 'Authorization': 'Bearer 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'};
    const cachedResponse = this.cache.get(`${this.url}/repos?per_page=${repoPerPage}&page=${pageNO}`);
    if(cachedResponse)
      {
        return of(cachedResponse);
      }
    return this.httpClient.get(`${this.url}/repos?per_page=${repoPerPage}&page=${pageNO}`,{headers}).pipe(tap(response=>this.cache.set(`${this.url}/repos?per_page=${repoPerPage}&page=${pageNO}`,response)));
  }
  changeRepo(data:any){
    this.repos.next(data);
  }

  
}
