import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Title } from '@angular/platform-browser';
import { ProfileComponent } from './profile/profile.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title='fyle-frontend-challenge';

  constructor(
    private apiService: ApiService,
    private titleService: Title
  ) {
    this.titleService.setTitle('fyle-frontend-challenge');
  }



  ngOnInit() {
    this.apiService.getUser('Prateek-singh-06').subscribe(data=>{
      this.apiService.changeUserData(data)
    });
    this.apiService.getrepo(10,1).subscribe(data=>{
      this.apiService.changeRepo(data);
    })
  }
}
