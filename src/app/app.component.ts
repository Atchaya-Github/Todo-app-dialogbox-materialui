import { Component, OnInit } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

import {MatTableDataSource} from '@angular/material/table';
import {MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Codo';
  displayedColumns:string[]=['id','task','description','action']
  dataSource = new MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private dialog: MatDialog,private apiservice: ApiService) { }
  
  ngOnInit(): void {
    this.gettask();
  }
  openDialog() {
    this.dialog.open(DialogComponent,{
     width: "40%", height:"50%",
    }).afterClosed().subscribe(val=>{
      if(val=="create"){this.gettask();}
    })
  }
  
  gettask(){
    this.apiservice.gettask()
    .subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
      },
      error:(_err)=>{
        alert("Error while getting task data")
      }
    })
  }
  editTask(row: any){
    this.dialog.open(DialogComponent,{
      width:"40%",height:"50%",data:row
    }).afterClosed().subscribe(val=>{
      if(val=="update"){this.gettask()};
    })
  }
}


 

