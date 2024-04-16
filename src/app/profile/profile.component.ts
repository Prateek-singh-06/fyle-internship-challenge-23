import { Component,OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';

interface UserData {
  name: string;
  bio:string;
  location: string;
  avatar_url:string;
  html_url:string;
  twitter_username:string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form = new FormGroup({
  name: new FormControl("Prateek-singh-06")
  });

  userData: UserData = {
  name: "",
  bio: "",
  location: "",
  avatar_url:"",
  html_url:"",
  twitter_username:"",

};

constructor(private apiService:ApiService){}

// handle search 
onSubmit() {
  console.log(this.form.value); 
  let username:string|null=this.form.value.name||null;
  if(username!=null){
    this.apiService.getUser(username).subscribe(data=>{
      console.log(data);
      
      if(data)
      {
        this.apiService.changeUserData(data)
      }
      
    });
    
    this.apiService.getrepo(10,1).subscribe(data=>{
      // console.log(data);
      if(data){
        this.apiService.changeRepo(data)
      }

    })
  }
  
}

  // retriver changed data in service
  ngOnInit(){
    this.apiService.currentUserData.subscribe(data => {
      if (data !== null) {
        Object.assign(this.userData, data);
        // console.log(this.userData);
      }
    });
    // console.log(this.userData);
  }



}
