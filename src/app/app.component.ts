import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title='fyle-frontend-challenge';

  constructor(private apiService: ApiService) {}


// to show my default repo when the websit is opned
  ngOnInit() {
    this.apiService.getUser('Prateek-singh-06').subscribe(data=>{
      this.apiService.changeUserData(data)
    });
    this.apiService.getrepo(10,1).subscribe(data=>{
      this.apiService.changeRepo(data);
    })
  }
}
