import { Component, OnInit } from '@angular/core';
import {  SharedService} from 'src/app/shared.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {
  DepartmentList:any=[]
  ActivateAddEditDepComp:boolean=false;
  ModalTitle:string | undefined;
  dep:any

  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFiler:any=[];

  constructor( private ss:SharedService) { }

  ngOnInit(): void {
    this.refDepList();

  }

  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditDepComp=true;
  }

  editClick(dep: any){
    this.dep=dep;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditDepComp=true;
  }
  deleteClick(emp: any){
    if(confirm("Are you Sure??")){
      this.ss.delDepartment(emp.EmployeeId).subscribe(res=>{
        alert(res.toString());
        this.refDepList();
      });
    }
  }
  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.refDepList();
  }
  refDepList(){
    this.ss.getDepList().subscribe(data=>{
      this.DepartmentList=data;
      this.DepartmentListWithoutFiler=data;
    });
  }

  filterFn(){
    var DepartmentIdFilter =  this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;
    this.DepartmentList = this.DepartmentListWithoutFiler.filter(function(el: { DepartmentId: { toString: () => string; }; DepartmentName: { toString: () => string; }; }){
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop: string | number,asc: any){
    this.DepartmentList = this.DepartmentListWithoutFiler.sort(function(a: { [x: string]: number; },b: { [x: string]: number; }){
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop])?-1:0);
      }
      else{
        return (a[prop]>b[prop])?-1 : ((a[prop]<b[prop])?1:0);
      }
    })
  }

}
