import { Component, OnInit } from '@angular/core';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  id: string;
  paramSubscription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: Position;
  successMessage: boolean = false;
  failMessage: boolean = false;
  constructor(private posService: PositionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => this.id = params['_id'], err => console.log("unable to get id parameter"));
    this.positionSubscription = this.posService.getPosition(this.id).subscribe(position => this.position = position[0], err => console.log("unable to get position"));
  }
  onSubmit(f: NgForm) {
    this.savePositionSubscription = this.posService.savePosition(this.position).subscribe(success => {
      this.successMessage = true;
      setTimeout(() => this.successMessage = false, 2500);
    }, 
    err => {
      this.failMessage = true;
      setTimeout(() => this.failMessage = false, 2500);
    });
  }
  ngOnDestroy() {
    if (this.paramSubscription)
      this.paramSubscription.unsubscribe();
    if (this.positionSubscription)
      this.positionSubscription.unsubscribe();
    if (this.savePositionSubscription)
      this.savePositionSubscription.unsubscribe();
  }
}
