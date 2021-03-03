import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KanaComponent } from './kana.component';

const routes: Routes = [{ path: '', component: KanaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KanaRoutingModule {}
