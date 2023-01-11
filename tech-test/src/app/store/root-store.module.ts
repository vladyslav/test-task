import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from '@store/reducers';
import { TodoListFeatureModule } from '@todo-list-feature/todo-list.module';

@NgModule({
  imports: [
    CommonModule,
    TodoListFeatureModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule {}
