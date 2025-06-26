import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FavoritosRoutingModule } from './favoritos-routing.module';
import { FavoritosComponent } from './favoritos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritosRoutingModule
  ],
  declarations: [FavoritosComponent]
})
export class FavoritosModule {}
