import { Component, OnInit } from '@angular/core';
import { Activity } from '../../_interfaces/activity.model';
import {ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activities: Activity[];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities(): void {
    this.activityService.getActivities()
      .subscribe(activities => this.activities = activities.slice(0,4));
  }
}
