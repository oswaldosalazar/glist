import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [ListsComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [ListsComponent]
})
export class ListsModule {}
