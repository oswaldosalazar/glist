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

    // this.listsService.addList().subscribe(data => console.log(data));
  }

  onSubmit(): void {
    this.name = this.createListForm.value.name;
    console.log(localStorage.getItem('user'));
    this.lists.push(this.name);
    this.createListForm.reset();
  }

  onClick(list) {
    this.listsService.sendListName(list);
    this.router.navigate(['/list']);
  }
}
