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

  private webApiUrl = 'http://localhost:5000/api/';
  
  getActivities(): Observable<Activity[]>{
    var activitiesUrl = this.webApiUrl.concat('Activities/AllActivities');
    return this._http.get<Activity[]>(activitiesUrl)
    .pipe(
      catchError(this.handleError<Activity[]>('getActivities', []))
      );
  }

  /** GET activity by id. Will 404 if id not found */
  getActivity(activityId: number): Observable<Activity>{
    var activityUrl = this.webApiUrl.concat('Activities/Activity')
    const url = `${activityUrl}/${activityId}`;
    return this._http.get<Activity>(url)
    .pipe(
      catchError(this.handleError<Activity>(`getActivity id=${activityId}`))
    );
  }
 
  updateActivity(activity: Activity): Observable<Activity>{
    var updateActivityURL = this.webApiUrl.concat('Activities/Update')
    const url = activity.activityId;
    return this._http.put<Activity>(`${updateActivityURL}/${url}`, activity, httpOptions)
    .pipe(
      catchError(this.handleError<Activity>(`updateActivity`, activity))
    );
  }

  addActivity(activity: Activity){
    var createActivityURL = this.webApiUrl.concat('Activities/Create');
    return this._http.post<Activity>(createActivityURL, activity, httpOptions).
    pipe(
      catchError(this.handleError<Activity>('addActivity'))
    );
  }

  deleteActivity(activityId: number){
    var deleteActivityURL = this.webApiUrl.concat('Activities/Delete');
    return this._http.delete<Activity>(`${deleteActivityURL}/${activityId}`,httpOptions).
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
