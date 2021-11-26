import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://127.0.0.1:8000"
  readonly PhotoUrl = "http://127.0.0.1:8000/media/"
  constructor(private http: HttpClient) { }
//department component services
  getDepList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/department/');
  }

  addDepartment(val:any){
    return this.http.post(this.APIUrl+'/department/',val);
  }

  updateDepartment(val:any){
    return this.http.put(this.APIUrl+'/department/',val);
  }

  delDepartment(val:any){
    return this.http.delete(this.APIUrl+'/department/'+val);
  }
//employee component services
  getEmpList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/employee/');
  }

  addEmployee(val:any){
    return this.http.post(this.APIUrl+'/employee/',val);
  }

  updateEmployee(val:any){
    return this.http.put(this.APIUrl+'/employee/',val);
  }

  delEmployee(val:any){
    return this.http.delete(this.APIUrl+'/employee/'+val);
  }

  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/department/');
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/SavePhoto',val);
  }

}
