import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

// Define the RepoData interface
interface RepoData{
  name:string;
  visibility:string;
  html_url:string;
  language:string|null;
}

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent {
  //this array is the option to select to select total no of repo per page
  numbers = Array.from({length: 10}, (_, i) => (i + 1) * 10);
  selectedNumber = this.numbers[0];
  pageNumber:number=1;
  repoData:RepoData={
    name:"",
    visibility:"",
    html_url:"",
    language:"",
  }
  allrepoData:RepoData[]=[];
  perpage:number=10;
  constructor(private apiService:ApiService){}
  
  // Function to handle previous page click
  onPreviousClicked(){
    if(this.pageNumber>1){
    this.pageNumber=this.pageNumber-1
    this.perpage=this.selectedNumber;
    this.apiService.getrepo(this.selectedNumber,this.pageNumber).subscribe(data=>{
      if(data){
        this.apiService.changeRepo(data)
      }

    })
  }
  }

  // Function to handle next page click
  onNextClicked(){
    this.pageNumber=this.pageNumber+1
    this.perpage=this.selectedNumber;
    this.apiService.getrepo(this.selectedNumber,this.pageNumber).subscribe(data=>{
      if(data.length>0){
        this.apiService.changeRepo(data)
      }
      else{
        this.pageNumber=this.pageNumber-1;
      }

    })
  }
  // Function to handle option change(user changes the no. of repo per page)
  onOptionChange(option:any){
    this.perpage=this.selectedNumber;
    this.apiService.getrepo(this.selectedNumber,this.pageNumber).subscribe(data=>{
      if(data){
        this.apiService.changeRepo(data)
      }

    })
    
  }

// Function to initialize component
  ngOnInit(){
    this.apiService.currentrepos.subscribe((data:RepoData[]) => {
      if (data !== null) {
        this.allrepoData=data;
      }
      
    });
    
  }

}
