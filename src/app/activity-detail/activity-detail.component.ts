import { Component, OnInit, Input} from '@angular/core';
import { Activity } from '../../_interfaces/activity.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ActivityService} from '../services/activity.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private location: Location, private activityService: ActivityService) { }

  @Input() activity?: Activity;

  ngOnInit(): void {
    this.getActivity();
  }

  goBack(): void {
    this.location.back();
  }

  getActivity(): void{
    const activityId = Number(this.activatedRoute.snapshot.paramMap.get('activityId'));
    this.activityService.getActivity(activityId)
      .subscribe(activity => this.activity = activity);
  }

  updateActivity(): void{
    this.activityService.updateActivity(this.activity)
      .subscribe(activity => this.activity = activity);
  }
}
