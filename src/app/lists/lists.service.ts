import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  url = 'http://localhost:3000';

  pendingItems: string[] = [];
  pickedItems: string[] = [];

  private subject = new BehaviorSubject<any>('');

  private _isListActive: boolean;
  public get isListActive(): boolean {
    return this._isListActive;
  }
  public set isListActive(value: boolean) {
    this._isListActive = value;
  }

  constructor(private http: HttpClient) {}

  addList(name, picked_items, pending_items) {
    const user = JSON.parse(localStorage.getItem('user'));
    const body = {
      user_id: user.id,
      name,
      picked_items,
      pending_items,
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

  addToPending(item: string) {
    this.pendingItems.push(item);
  }

  addToPicked(item: string) {
    this.pickedItems.push(item);
  }

  getPendingItems() {
    return this.pendingItems;
  }

  getPickedItems() {
    return this.pickedItems;
  }
}
