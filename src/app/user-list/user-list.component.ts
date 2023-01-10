import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userList: any[]=[];

  constructor(private http:HttpClient){

  }
  ngOnInit() {
    this.getUserList();
  }

  getUserList(){
    this.http.get('http://localhost:8080/users').subscribe((responce:any) =>{
      this.userList = responce;
    })

  }
}



