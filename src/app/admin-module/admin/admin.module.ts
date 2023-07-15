import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { MotherboardComponent } from './admin-item/motherboard/motherboard.component';
import { CreateMotherboardComponent } from './admin-item/motherboard/create-motherboard/create-motherboard.component';
import { EditMotherboardComponent } from './admin-item/motherboard/edit-motherboard/edit-motherboard.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NewOrderComponent } from './admin-dashboard/new-order/new-order.component';
import { ConfirmeOrderComponent } from './admin-dashboard/confirme-order/confirme-order.component';
import { CancleOrderComponent } from './admin-dashboard/cancle-order/cancle-order.component';


import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { AdminSideNavComponent } from './admin-side-nav/admin-side-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VgaComponent } from './admin-item/vga/vga.component';
import { ProcessorComponent } from './admin-item/processor/processor.component';
import { MemoryComponent } from './admin-item/memory/memory.component';
import { PsuComponent } from './admin-item/psu/psu.component';
import { MoniterComponent } from './admin-item/moniter/moniter.component';
import { SpeackerComponent } from './admin-item/speacker/speacker.component';
import { StorageComponent } from './admin-item/storage/storage.component';
import { KeyboardMComponent } from './admin-item/keyboard-m/keyboard-m.component';
import { CreateKeyboardmComponent } from './admin-item/keyboard-m/create-keyboardm/create-keyboardm.component';
import { EditKeyboardmComponent } from './admin-item/keyboard-m/edit-keyboardm/edit-keyboardm.component';
import { DetailsKeyboardmComponent } from './admin-item/keyboard-m/details-keyboardm/details-keyboardm.component';
import { MemoryCreateComponent } from './admin-item/memory/memory-create/memory-create.component';
import { MemoryEditComponent } from './admin-item/memory/memory-edit/memory-edit.component';
import { MemoryDetailsComponent } from './admin-item/memory/memory-details/memory-details.component';
import { MoniterCreateComponent } from './admin-item/moniter/moniter-create/moniter-create.component';
import { MoniterEditComponent } from './admin-item/moniter/moniter-edit/moniter-edit.component';
import { MoniterDetailsComponent } from './admin-item/moniter/moniter-details/moniter-details.component';
import { ProcessorCreateComponent } from './admin-item/processor/processor-create/processor-create.component';
import { ProcessorEditComponent } from './admin-item/processor/processor-edit/processor-edit.component';
import { ProcessorDetailsComponent } from './admin-item/processor/processor-details/processor-details.component';
import { PsuCreateComponent } from './admin-item/psu/psu-create/psu-create.component';
import { PsuEditComponent } from './admin-item/psu/psu-edit/psu-edit.component';
import { PsuDetailsComponent } from './admin-item/psu/psu-details/psu-details.component';
import { SpeackerCreateComponent } from './admin-item/speacker/speacker-create/speacker-create.component';
import { SpeackerEditComponent } from './admin-item/speacker/speacker-edit/speacker-edit.component';
import { SpeackerDetailsComponent } from './admin-item/speacker/speacker-details/speacker-details.component';
import { StorageCreateComponent } from './admin-item/storage/storage-create/storage-create.component';
import { StorageEditComponent } from './admin-item/storage/storage-edit/storage-edit.component';
import { StorageDetailsComponent } from './admin-item/storage/storage-details/storage-details.component';
import { VgaCreateComponent } from './admin-item/vga/vga-create/vga-create.component';
import { VgaEditComponent } from './admin-item/vga/vga-edit/vga-edit.component';
import { VgaDetailsComponent } from './admin-item/vga/vga-details/vga-details.component';
import { AdminBillComponent } from './admin-bill/admin-bill.component';
import { SellsComponent } from './admin-dashboard/sells/sells.component';
import { TotalSellsComponent } from './admin-dashboard/total-sells/total-sells.component';
import { CustomerDetailsComponent } from './admin-dashboard/customer-details/customer-details.component';

@NgModule({
  declarations: [
    MotherboardComponent,
    CreateMotherboardComponent,
    EditMotherboardComponent,
    AdminDashboardComponent,
    NewOrderComponent,
    ConfirmeOrderComponent,
    CancleOrderComponent,
    AdminFooterComponent,
    AdminComponent,
    AdminSideNavComponent,
    AdminNavigationComponent,
    VgaComponent,
    ProcessorComponent,
    MemoryComponent,
    PsuComponent,
    MoniterComponent,
    SpeackerComponent,
    StorageComponent,
    KeyboardMComponent,
    CreateKeyboardmComponent,
    EditKeyboardmComponent,
    DetailsKeyboardmComponent,
    MemoryCreateComponent,
    MemoryEditComponent,
    MemoryDetailsComponent,
    MoniterCreateComponent,
    MoniterEditComponent,
    MoniterDetailsComponent,
    ProcessorCreateComponent,
    ProcessorEditComponent,
    ProcessorDetailsComponent,
    PsuCreateComponent,
    PsuEditComponent,
    PsuDetailsComponent,
    SpeackerCreateComponent,
    SpeackerEditComponent,
    SpeackerDetailsComponent,
    StorageCreateComponent,
    StorageEditComponent,
    StorageDetailsComponent,
    VgaCreateComponent,
    VgaEditComponent,
    VgaDetailsComponent,
    AdminBillComponent,
    SellsComponent,
    TotalSellsComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
