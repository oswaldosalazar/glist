import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

import { ListsService } from './../lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  pageTitle = 'Add List';
  createListForm: FormGroup;

  constructor(private listsService: ListsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createListForm = this.fb.group({
      listName: ['', [Validators.required]]
    });
    // this.listsService.addList().subscribe(data => console.log(data));
  }

  onSubmit(): void {
    const newListName = this.createListForm.value;
    console.log(newListName);
    this.createListForm.reset();
    // this.store.dispatch(UserActions.loginUser({ user }));
  }
}
