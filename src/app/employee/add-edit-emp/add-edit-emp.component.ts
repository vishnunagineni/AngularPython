import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {
  @Input() emp:any;
  EmployeeId:string | undefined;
  EmployeeName:string | undefined;
  Department:string | undefined;
  DateOfJoining:string | undefined;
  PhotoFile:string | undefined;
  PhotoFilePath:string | undefined;
  DepartmentList:any=[]

  constructor(private ss:SharedService) { }

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList(){
    this.ss.getAllDepartmentNames().subscribe(data=>{
      this.DepartmentList=data;
    });
    this.EmployeeId=this.emp.EmployeeId;
    this.EmployeeName=this.emp.EmployeeName;
    this.Department=this.emp.Department;
    this.DateOfJoining=this.emp.DateOfJoining;
    this.PhotoFile=this.emp.PhotoFile;
    this.PhotoFilePath=this.ss.PhotoUrl+this.PhotoFile
  }
  addEmployee(){
    var val= {EmployeeId:this.EmployeeId,
              EmployeeName:this.EmployeeName,
              Department:this.Department,
              DateOfJoining:this.DateOfJoining,
              PhotoFile:this.PhotoFile
            };
    console.log(val)
    this.ss.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  updateEmployee(){
    var val= {EmployeeId:this.EmployeeId,
              EmployeeName:this.EmployeeName,
              Department:this.Department,
              DateOfJoining:this.DateOfJoining,
              PhotoFile:this.PhotoFile
            };
    this.ss.updateEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formdata:FormData = new FormData();
    formdata.append('uploadedFile',file,file.name);
    this.ss.UploadPhoto(formdata).subscribe(data=>{
      this.PhotoFile=data.toString();
      this.PhotoFilePath=this.ss.PhotoUrl+this.PhotoFile;
    });

  }

}
