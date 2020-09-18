import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  url = 'http://localhost:3000';

  private subject = new BehaviorSubject<any>('');

  private _isListActive: boolean;
  public get isListActive(): boolean {
    return this._isListActive;
  }
  public set isListActive(value: boolean) {
    this._isListActive = value;
  }

  constructor(private http: HttpClient) {}

  addList() {
    const body = {
      user_id: 1,
      name: 'list5',
      picked_items: ['item1', 'item2'],
      pending_items: ['item3'],
      shared_with: [2]
    };

    return this.http.post<any>(
      `${this.url}/lists/add-list`,
      body
      // , {
      //   headers: this.headers
      // }
    );
  }

  sendListName(name: string) {
    this.subject.next(name);
  }

  clearListName() {
    this.subject.next('');
  }

  onListName(): Observable<any> {
    return this.subject.asObservable();
  }
}
