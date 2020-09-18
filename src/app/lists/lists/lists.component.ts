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
      name: ['', [Validators.required]]
    });

    // this.listsService.addList().subscribe(data => console.log(data));
  }

  onSubmit(): void {
    const newListName = this.createListForm.value.name;
    this.createListForm.reset();
    this.showList = true;
    this.router.navigate(['/list']);
    this.sendListName(newListName);
  }

  sendListName(name): void {
    this.listsService.sendListName(name);
  }
}
