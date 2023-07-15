import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NewOrderComponent } from './admin-dashboard/new-order/new-order.component';
import { ConfirmeOrderComponent } from './admin-dashboard/confirme-order/confirme-order.component';
import { CancleOrderComponent } from './admin-dashboard/cancle-order/cancle-order.component';
import { MotherboardComponent } from './admin-item/motherboard/motherboard.component';
import { CreateMotherboardComponent } from './admin-item/motherboard/create-motherboard/create-motherboard.component';
import { EditMotherboardComponent } from './admin-item/motherboard/edit-motherboard/edit-motherboard.component';
import { MotherboardDetailsComponent } from './admin-item/motherboard/motherboard-details/motherboard-details.component';
import { KeyboardMComponent } from './admin-item/keyboard-m/keyboard-m.component';
import { CreateKeyboardmComponent } from './admin-item/keyboard-m/create-keyboardm/create-keyboardm.component';
import { EditKeyboardmComponent } from './admin-item/keyboard-m/edit-keyboardm/edit-keyboardm.component';
import { DetailsKeyboardmComponent } from './admin-item/keyboard-m/details-keyboardm/details-keyboardm.component';
import { MemoryComponent } from './admin-item/memory/memory.component';
import { MemoryCreateComponent } from './admin-item/memory/memory-create/memory-create.component';
import { MemoryEditComponent } from './admin-item/memory/memory-edit/memory-edit.component';
import { MemoryDetailsComponent } from './admin-item/memory/memory-details/memory-details.component';
import { MoniterComponent } from './admin-item/moniter/moniter.component';
import { MoniterCreateComponent } from './admin-item/moniter/moniter-create/moniter-create.component';
import { MoniterEditComponent } from './admin-item/moniter/moniter-edit/moniter-edit.component';
import { MoniterDetailsComponent } from './admin-item/moniter/moniter-details/moniter-details.component';
import { ProcessorComponent } from './admin-item/processor/processor.component';
import { ProcessorCreateComponent } from './admin-item/processor/processor-create/processor-create.component';
import { ProcessorEditComponent } from './admin-item/processor/processor-edit/processor-edit.component';
import { ProcessorDetailsComponent } from './admin-item/processor/processor-details/processor-details.component';
import { VgaComponent } from './admin-item/vga/vga.component';
import { VgaCreateComponent } from './admin-item/vga/vga-create/vga-create.component';
import { VgaEditComponent } from './admin-item/vga/vga-edit/vga-edit.component';
import { VgaDetailsComponent } from './admin-item/vga/vga-details/vga-details.component';
import { AdminBillComponent } from './admin-bill/admin-bill.component';
import { PsuComponent } from './admin-item/psu/psu.component';
import { PsuCreateComponent } from './admin-item/psu/psu-create/psu-create.component';
import { PsuEditComponent } from './admin-item/psu/psu-edit/psu-edit.component';
import { PsuDetailsComponent } from './admin-item/psu/psu-details/psu-details.component';
import { StorageComponent } from './admin-item/storage/storage.component';
import { StorageCreateComponent } from './admin-item/storage/storage-create/storage-create.component';
import { StorageEditComponent } from './admin-item/storage/storage-edit/storage-edit.component';
import { StorageDetailsComponent } from './admin-item/storage/storage-details/storage-details.component';
import { SpeackerComponent } from './admin-item/speacker/speacker.component';
import { SpeackerCreateComponent } from './admin-item/speacker/speacker-create/speacker-create.component';
import { SpeackerDetailsComponent } from './admin-item/speacker/speacker-details/speacker-details.component';
import { SellsComponent } from './admin-dashboard/sells/sells.component';
import { TotalSellsComponent } from './admin-dashboard/total-sells/total-sells.component';
import { SpeackerEditComponent } from './admin-item/speacker/speacker-edit/speacker-edit.component';
import { CustomerDetailsComponent } from './admin-dashboard/customer-details/customer-details.component';

const routes: Routes = [
   // admin router
 {path : '', component : AdminComponent, 
 children : [
  { path : '' , redirectTo: 'dashboard' , pathMatch : 'full'},
  {path : 'dashboard' , component : AdminDashboardComponent},
  {path : 'dashboard/NewOrders' , component : NewOrderComponent},
  {path : 'dashboard/ConfirmeOrders' , component : ConfirmeOrderComponent},
  {path : 'dashboard/NewOrders/bill/:id', component : AdminBillComponent},

  {path : 'dashboard/CancleOrders' , component : CancleOrderComponent},
  {path : 'dashboard/ItemSells' , component : SellsComponent},
  {path : 'dashboard/TotalSells' , component : TotalSellsComponent},
  {path : 'dashboard/Customers' , component : CustomerDetailsComponent},

  // motherboard
  { path : 'motherboard', component : MotherboardComponent },
  { path : 'motherboard/new' , component : CreateMotherboardComponent},
  { path : 'motherboard/update/:id', component : EditMotherboardComponent},
  { path : 'motherboard/details/:id' , component : MotherboardDetailsComponent},

   // graphic card
   { path : 'vga', component : VgaComponent },
   { path : 'vga/new' , component : VgaCreateComponent},
   { path : 'vga/update/:id', component : VgaEditComponent},
   { path : 'vga/details/:id' , component : VgaDetailsComponent}  ,


  //keyboard & mouse

  { path : 'keyboardmouse', component : KeyboardMComponent },
  { path : 'keyboardmouse/new' , component : CreateKeyboardmComponent},
  { path : 'keyboardmouse/update/:id', component : EditKeyboardmComponent},
  { path : 'keyboardmouse/details/:id' , component : DetailsKeyboardmComponent},
  

    // memory
  { path : 'memory', component : MemoryComponent },
  { path : 'memory/new' , component : MemoryCreateComponent},
  { path : 'memory/update/:id', component : MemoryEditComponent},
  { path : 'memory/details/:id' , component : MemoryDetailsComponent},


  // moniter
  { path : 'moniter', component : MoniterComponent },
  { path : 'moniter/new' , component : MoniterCreateComponent},
  { path : 'moniter/update/:id', component : MoniterEditComponent},
  { path : 'moniter/details/:id' , component : MoniterDetailsComponent},    


   // processor
   { path : 'processor', component : ProcessorComponent },
   { path : 'processor/new' , component : ProcessorCreateComponent},
   { path : 'processor/update/:id', component : ProcessorEditComponent},
   { path : 'processor/details/:id' , component : ProcessorDetailsComponent} ,
   
   

    // psu
    { path : 'psu', component : PsuComponent },
    { path : 'psu/new' , component : PsuCreateComponent},
    { path : 'psu/update/:id', component : PsuEditComponent},
    { path : 'psu/details/:id' , component : PsuDetailsComponent},
    
    

    // storage
    { path : 'storage', component : StorageComponent },
    { path : 'storage/new' , component : StorageCreateComponent},
    { path : 'storage/update/:id', component : StorageEditComponent},
    { path : 'storage/details/:id' , component : StorageDetailsComponent},


    // speacker
   { path : 'speacker', component : SpeackerComponent },
   { path : 'speacker/new' , component : SpeackerCreateComponent},
   { path : 'speacker/update/:id', component : SpeackerEditComponent},
   { path : 'speacker/details/:id' , component : SpeackerDetailsComponent},





 ]

}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
