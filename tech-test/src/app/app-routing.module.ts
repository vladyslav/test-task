import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { routes } from '@app/app.routes';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
