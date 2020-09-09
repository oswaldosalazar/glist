import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pageTitle = 'Add Item';
  showLists: boolean;
  createItemForm: FormGroup;

  constructor(private fb: FormBuilder, private listsService: ListsService) {}

  ngOnInit(): void {
    this.createItemForm = this.fb.group({
      itemName: ['', [Validators.required]]
    });
    this.listsService.isListActive = true;
  }

  onSubmit(): void {
    const newListName = this.createItemForm.value;
    console.log(newListName);
    this.createItemForm.reset();

    // this.router.navigate(['/list']);

    // this.store.dispatch(UserActions.loginUser({ user }));
  }
}
