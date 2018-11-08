import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { EmployeeRaw } from './employeeRaw';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('https://damp-sands-52459.herokuapp.com/employees');
  }
  saveEmployee(employee: EmployeeRaw) : Observable<any> {
    return this.http.put<any>('https://damp-sands-52459.herokuapp.com/employee/' + employee._id, employee);
  }
  getEmployee(id) : Observable<EmployeeRaw[]> {
    return this.http.get<EmployeeRaw[]>('https://damp-sands-52459.herokuapp.com/employee-raw/' + id);
  }
}
