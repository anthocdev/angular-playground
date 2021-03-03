import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KanaComponent } from './kana.component';
import { KanaRoutingModule } from './kana-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
  imports: [
    NzInputNumberModule,
    NzSliderModule,
    FormsModule,
    NzCheckboxModule,
    NzGridModule,
    NzCardModule,
    CommonModule,
    NzButtonModule,
    KanaRoutingModule,
  ],
  declarations: [KanaComponent],
  exports: [KanaComponent],
})
export class KanaModule {}
