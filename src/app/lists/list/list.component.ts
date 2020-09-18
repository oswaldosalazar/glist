import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  pageTitle = 'Add Item';
  showLists: boolean;
  createItemForm: FormGroup;
  list: string[] = [];
  name: string;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private listsService: ListsService) {
    this.subscription = this.listsService
      .onListName()
      .subscribe(name => (this.name = name));
  }

  ngOnInit(): void {
    this.createItemForm = this.fb.group({
      item: ['', [Validators.required]]
    });
    this.listsService.isListActive = true;
  }

  onSubmit(): void {
    const item = this.createItemForm.value.item;
    this.list.push(item);
    this.createItemForm.reset();
    console.log(this.list);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
