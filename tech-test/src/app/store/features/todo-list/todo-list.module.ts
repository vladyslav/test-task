import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { todoListFeatureName } from '@todo-list-feature/todo-list.state';
import { TodoListEffects } from '@todo-list-feature/effects/todo-list.effects';
import { todoListReducers } from '@todo-list-feature/reducers/todo-list.reducers';

@NgModule({
  imports: [StoreModule.forFeature(todoListFeatureName, todoListReducers), EffectsModule.forFeature([TodoListEffects])]
})
export class TodoListFeatureModule {}
