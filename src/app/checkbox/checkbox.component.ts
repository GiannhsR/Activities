import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../_interfaces/activity.model';
import {ActivityService} from '../services/activity.service';
import { ActivitiesComponent } from '../activities/activities.component'
 
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  public checked = false;

  @Input() activity?: Activity;
  
  constructor(private activityService: ActivityService, private activityComponent: ActivitiesComponent) { }

  ngOnInit(): void {
    if(this.activity.isCompleted === Boolean(true))
      this.checked = true;
  }

  checkIfCompleted(): void { 
    this.activity.isCompleted = !this.activity.isCompleted;
    this.activityService.updateActivity(this.activity)
      .subscribe(activity => {
        this.activityComponent.activity = activity;
      });  
  }
}
