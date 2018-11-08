import { Component, OnInit } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  getEmployeesSub: any;
  loadingError: boolean = false;
  constructor(private empService: EmployeeService, private router: Router) { }
  ngOnInit() {
    this.getEmployeesSub = this.empService.getEmployees().subscribe(employees => {this.employees = employees; this.filteredEmployees = employees;}, err => this.loadingError = true);
  }
  routeEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }
  onEmployeeSearchKeyUP(event) {
    let filter = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((emp) => {
      return emp.FirstName.toLowerCase().includes(filter) || emp.LastName.toLowerCase().includes(filter) || emp.Position.PositionName.toLowerCase().includes(filter);
    });
  }
  ngOnDestroy() {
    if (this.getEmployeesSub)
      this.getEmployeesSub.unsubscribe();
  }
}
