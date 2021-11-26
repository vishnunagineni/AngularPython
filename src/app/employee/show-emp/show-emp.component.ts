import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {
  EmployeeList:any=[]
  ModalTitle:string | undefined;
  ActivateAddEditEmpComp:boolean=false;
  MediaUrl = this.ss.PhotoUrl;
  emp:any;

  EmployeeIdFilter:string="";
  EmployeeNameFilter:string="";
  DateOfJoiningFilter:string="";
  DepartmentFilter:string="";
  EmployeeListWithoutFilter:any=[]

  constructor(private ss:SharedService) { }

  ngOnInit(): void {
    this.refEmpList();
  }

  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFile:"anonymous.png"
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;
  }

  editClick(emp: any){
    this.emp=emp;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }
  deleteClick(id: any){
    if(confirm("Are you sure???")){
      this.ss.delEmployee(id).subscribe(res=>{
        alert(res.toString());
        this.refEmpList();
      });
    }
  }
  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refEmpList();
  }

  refEmpList(){
    this.ss.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
      this.EmployeeListWithoutFilter=data;
    });
  }

  filterFn(){
    var EmployeeIdFilter = this.EmployeeIdFilter;
    var EmployeeNameFilter = this.EmployeeNameFilter;
    var DepartmentFilter = this.DepartmentFilter;
    var DateOfJoiningFilter = this.DateOfJoiningFilter;
    this.EmployeeList = this.EmployeeListWithoutFilter.filter(function(el: { EmployeeId: { toString: () => string; }; EmployeeName: { toString: () => string; }; Department: { toString: () => string; }; DateOfJoining: { toString: () => string; }; }){
      return el.EmployeeId.toString().toLowerCase().includes(
        EmployeeIdFilter.toString().trim().toLowerCase()
      )&& 
      el.EmployeeName.toString().toLowerCase().includes(
        EmployeeNameFilter.toString().trim().toLowerCase()
      )&&
      el.Department.toString().toLowerCase().includes(
        DepartmentFilter.toString().trim().toLowerCase()
      )&&
      el.DateOfJoining.toString().toLowerCase().includes(
        DateOfJoiningFilter.toString().trim().toLowerCase()
      );
    })
  }

  sortResult(prop: string | number,asc: any){
    this.EmployeeList = this.EmployeeListWithoutFilter.sort(function(a: { [x: string]: number; },b: { [x: string]: number; }){
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop])?-1:0);
      }
      else{
        return (a[prop]>b[prop])?-1 : ((a[prop]<b[prop])?1:0);
      }
    })
  }
}
