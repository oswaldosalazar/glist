import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { ListComponent } from './list/list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ListsComponent, ListComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, DragDropModule],
  exports: [ListsComponent]
})
export class ListsModule {}
