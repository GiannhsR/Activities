import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Activity } from '../../_interfaces/activity.model'; 


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class ActivityService {

  constructor(private _http: HttpClient) { }

  private activitiesUrl = 'http://localhost:5000/api/Activities/AllActivities'; //URL to Web API
  private activityUrl = 'http://localhost:5000/api/Activities/Activity';
  private updateActivityURL = 'http://localhost:5000/api/Activities/Update'; 
  private createActivityURL = 'http://localhost:5000/api/Activities/Create';
  private deleteActivityURL = 'http://localhost:5000/api/Activities/Delete';
  
  getActivities(): Observable<Activity[]>{
    return this._http.get<Activity[]>(this.activitiesUrl)
    .pipe(
      catchError(this.handleError<Activity[]>('getActivities', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getActivity(activityId: number): Observable<Activity>{
    const url = `${this.activityUrl}/${activityId}`;
    return this._http.get<Activity>(url)
    .pipe(
      catchError(this.handleError<Activity>(`getActivity id=${activityId}`))
    );
  }
 
  updateActivity(activity: Activity): Observable<Activity>{
    const url = activity.activityId;
    return this._http.put<Activity>(`${this.updateActivityURL}/${url}`, activity, httpOptions)
    .pipe(
      catchError(this.handleError<Activity>(`updateActivity`, activity))
    );
  }

  addActivity(activity: Activity){
    return this._http.post<Activity>(this.createActivityURL, activity, httpOptions).
    pipe(
      catchError(this.handleError<Activity>('addActivity'))
    );
  }

  deleteActivity(activityId: number){
    return this._http.delete<Activity>(`${this.deleteActivityURL}/${activityId}`,httpOptions).
    pipe(
      catchError(this.handleError<Activity>(`deleteActivity id=${activityId}`))
    )
  }
   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
 */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
     // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
       return of(result as T);
    };
  }
}
