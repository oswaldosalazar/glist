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
  list = {};
  listName: string;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private listsService: ListsService) {
    this.subscription = this.listsService.onListName().subscribe(listName => {
      console.log('constructor listName: ', listName);
      this.listName = listName;
    });
  }

  ngOnInit(): void {
    this.createItemForm = this.fb.group({
      itemName: ['', [Validators.required]]
    });
    this.listsService.isListActive = true;
    console.log(this.listName);
  }

  onSubmit(): void {
    const newListName = this.createItemForm.value;
    console.log(newListName);
    this.createItemForm.reset();

    // this.router.navigate(['/list']);

    // this.store.dispatch(UserActions.loginUser({ user }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
