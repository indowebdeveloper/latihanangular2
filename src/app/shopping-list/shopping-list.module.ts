import { LoggingService } from './../logging.service';
import { SharedModule } from './../shared/shared.module';
import { ShoppingListRoutingModule } from './shopping-list-route.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [SharedModule, FormsModule, ShoppingListRoutingModule],
  //providers: [LoggingService],
})
export class ShoppingListModule {}
