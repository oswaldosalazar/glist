import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ListsService } from './../lists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  pageTitle = 'Add List';
  createListForm: FormGroup;
  showList: boolean;

  constructor(
    private listsService: ListsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showList = false;
    this.listsService.isListActive = false;
    this.createListForm = this.fb.group({
      listName: ['', [Validators.required]]
    });

    // this.listsService.addList().subscribe(data => console.log(data));
  }

  onSubmit(): void {
    const newListName = this.createListForm.value;
    console.log(newListName);
    this.createListForm.reset();
    this.showList = true;
    this.router.navigate(['/list']);

    // this.store.dispatch(UserActions.loginUser({ user }));
  }
}
