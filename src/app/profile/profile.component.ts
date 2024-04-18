import { Component,OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';

// Define the UserData interface
interface UserData {
  name: string|null;
  bio:string|null;
  location: string|null;
  avatar_url:string;
  html_url:string;
  twitter_username:string|null;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Initialize form with default username
  form = new FormGroup({
  name: new FormControl("Prateek-singh-06")
  });

  // Initialize user data
  userData: UserData = {
  name: "",
  bio: "",
  location: "",
  avatar_url:"",
  html_url:"",
  twitter_username:"",

};

constructor(private apiService:ApiService){}

// Function to handle form submission (submission of username)
onSubmit() {
  let username:string|null=this.form.value.name||null;
  if(username!=null){
    // Fetch user data and update service
    this.apiService.getUser(username).subscribe(data=>{
      if(data)
      {
        this.apiService.changeUserData(data)
      }
      
    });
    
    // Fetch repository data and update service
    this.apiService.getrepo(10,1).subscribe(data=>{
      if(data){
        this.apiService.changeRepo(data)
      }

    })
  }
  
}

  // Function to initialize component and subscribe to user data changes
  ngOnInit(){
    this.apiService.currentUserData.subscribe(data => {
      if (data !== null) {
        Object.assign(this.userData, data);
        
      }
    });
    
  }



}
