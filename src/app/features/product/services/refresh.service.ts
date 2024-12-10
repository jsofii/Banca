import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private refreshSubject = new Subject<void>();

  get refresh$() {
    console.log('RefreshService: refresh$');
    return this.refreshSubject.asObservable();
  }

  triggerRefresh() {
    console.log('RefreshService: triggerRefresh');
    this.refreshSubject.next();
  }
}
