import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { Position } from '../data/position';
import { EmployeeService } from '../data/employee.service';
import { PositionService } from '../data/position.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  id: string;
  paramSubscription: any;
  employeeSubscription: any;
  getPositionsSubscription: any;
  saveEmployeeSubscription: any;
  employee: EmployeeRaw;
  positions: Position[];
  successMessage: boolean = false;
  failMessage: boolean = false;
  constructor(private empService: EmployeeService, private posService: PositionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => this.id = params['_id'], err => console.log("unable to get id parameter"));
    this.employeeSubscription = this.empService.getEmployee(this.id).subscribe(employees => this.employee = employees[0], err => console.log("unable to get employee"));
    this.getPositionsSubscription = this.posService.getPositions().subscribe(pos => this.positions = pos, err => console.log("unable to get positions"));
  }
  onSubmit(f: NgForm) {
    this.saveEmployeeSubscription = this.empService.saveEmployee(this.employee).subscribe(success => {
      this.successMessage = true;
      setTimeout(() => this.successMessage = false, 2000);
    },
    err => {
      this.failMessage = true;
      setTimeout(() => this.failMessage = false, 2500);
    });
  }
  ngOnDestroy() {
    if (this.paramSubscription)
      this.paramSubscription.unsubscribe();
    if (this.employeeSubscription)
      this.employeeSubscription.unsubscribe();
    if (this.getPositionsSubscription)
      this.getPositionsSubscription.unsubscribe();
    if (this.saveEmployeeSubscription)
      this.saveEmployeeSubscription.unsubscribe();
  }
}
