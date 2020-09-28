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
  name: string = null;
  lists: string[] = [];

  constructor(
    private listsService: ListsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listsService.isListActive = false;
    this.createListForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.name = this.createListForm.value.name;
    this.lists.push(this.name);
    this.createListForm.reset();
    this.listsService
      .addList(this.name, [], [])
      .subscribe(data => console.log(data));
  }

  onClick(list) {
    this.listsService.sendListName(list);
    this.router.navigate(['/list']);
  }
}
