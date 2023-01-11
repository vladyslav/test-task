import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const components = [
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatFormFieldModule,
  MatListModule,
  MatSlideToggleModule
];

@NgModule({
  imports: components,
  exports: components
})
export class MaterialModule {}
