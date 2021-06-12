import { Component, OnDestroy, OnInit } from '@angular/core';
import { Activity } from '../../_interfaces/activity.model';
import { ActivityService} from '../services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit{

  constructor(private _activityService: ActivityService ) { }

  public activities: Activity[] = [];
  public activity?: Activity;

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities(){
    this._activityService.getActivities()
        .subscribe(activities => this.activities = activities);
  }

  delete(activity : Activity): void { 
   var indexOfActivityToBeDeleted: number =  this.activities.indexOf(activity);
   this.activities.splice(indexOfActivityToBeDeleted,1);
    this._activityService.deleteActivity(activity.activityId)
      .subscribe();
  }

  add(name: string, description: string){
    name = name.trim();
    description = description.trim();
    var isCompleted: boolean = false;
    var isDeleted: boolean = false;
    var date: Date = new Date();
    var activityId = this.getActivityIdOfLastActivity(this.activities) + 1;
    if (!name) { return; }  
    this._activityService.addActivity({ activityId,name,description,isCompleted,isDeleted,date } as Activity)
      .subscribe(activity => {
        this.activities.push(activity);
      });
  }

  getActivityIdOfLastActivity(activities: Activity[]): number{
    var latestActivityId = activities[activities.length - 1].activityId;
    return latestActivityId;
  }
}
