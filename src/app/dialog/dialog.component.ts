import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  Update_Button:string="Create"
   taskform=new FormGroup({
   task:new FormControl('',[Validators.required,Validators.minLength(2)]),
   description:new FormControl('',Validators.required)
  })
  
  constructor(private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any, 
    private apiservice:ApiService){}
      
     //Setting editformtasks 
     ngOnInit(): void {
      if(this.editData){
        this.Update_Button="Update";
        this.taskform.controls['task'].setValue(this.editData.task);
        this.taskform.controls['description'].setValue(this.editData.description);
      }
     };

    create(){
     if(!this.editData){
      if(this.taskform.valid){
        this.apiservice.posttask(this.taskform.value)
        .subscribe({
          next:(res)=>{
           alert('Task Added sucessfully');
           this.dialogRef.close("create"); 
          },
          error:()=>{
            alert("Error while adding the task")
          }
         })
        }
      }else{
        this.updatetask()
      }
    }  
      updatetask(){
       this.apiservice.updatetask(this.taskform.value,this.editData.id)   
       .subscribe({
        next:(res)=> {
          alert('Task updated sucessfully');
          this.taskform.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error acquired while updating")
        }
       })
  }  
}      



