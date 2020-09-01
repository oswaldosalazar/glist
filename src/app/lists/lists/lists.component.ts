import { Component, OnInit } from '@angular/core';

import { ListsService } from './../lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  constructor(private listsService: ListsService) {}

  ngOnInit(): void {
    // this.listsService.addList().subscribe(data => console.log(data));
  }
}
