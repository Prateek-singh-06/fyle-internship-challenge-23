import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
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
  currentNumber:number=1;
  perpage:number=10;
  
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
  onOptionChange(option:any){
    this.perpage=this.selectedNumber;
    console.log("hello");
    this.apiService.getrepo(this.selectedNumber,this.pageNumber).subscribe(data=>{
      // console.log(data);
      if(data){
        this.apiService.changeRepo(data)
      }

    })
    
  }

  constructor(private apiService:ApiService){}

  ngOnInit(){
    this.apiService.currentrepos.subscribe((data:RepoData[]) => {
      if (data !== null) {
        this.allrepoData=data;
      }
      console.log(this.allrepoData);
    });
    // console.log(this.userData);
  }

}
