import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListsComponent, ListComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [ListsComponent]
})
export class ListsModule {}
