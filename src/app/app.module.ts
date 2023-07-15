import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';

/* admin componet*/
/* import { AdminComponent } from './admin/admin.component';
import { VgaComponent } from './admin/admin-item/vga/vga.component';
import { CreateMotherboardComponent } from './admin/admin-item/motherboard/create-motherboard/create-motherboard.component';
import { EditMotherboardComponent } from './admin/admin-item/motherboard/edit-motherboard/edit-motherboard.component';

import { RamComponent } from './admin/admin-item/ram/ram.component';
import { ProcessorComponent } from './admin/admin-item/processor/processor.component';
import { MotherboardComponent } from './admin/admin-item/motherboard/motherboard.component';

import { AdminSideNavComponent } from './admin/admin-side-nav/admin-side-nav.component';
import { AdminNavigationComponent } from './admin/admin-navigation/admin-navigation.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NewOrderComponent } from './admin/admin-dashboard/new-order/new-order.component';
import { ConfirmeOrderComponent } from './admin/admin-dashboard/confirme-order/confirme-order.component';
import { CancleOrderComponent } from './admin/admin-dashboard/cancle-order/cancle-order.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
 */

import { UserNavbarComponent } from './user/user-navbar/user-navbar.component';
import { UserSidebarComponent } from './user/user-sidebar/user-sidebar.component';
import { HomeComponent } from './user/home/home.component';

/* user component*/
import { MotherboardUserComponent } from './user/user-item/motherboard-user/motherboard-user.component';
import { VgaUserComponent } from './user/user-item/vga-user/vga-user.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCartComponent } from './user/user-cart/user-cart.component';
import { UserFormComponent } from './user/user-form/user-form.component';

import { UserBillComponent } from './user/user-bill/user-bill.component';
import { orderService } from './user/user-form/order-service';

import { UserFooterComponent } from './user/user-footer/user-footer.component';
 import { LoginComponent } from './login/login.component';
import { ProcessorUserComponent } from './user/user-item/processor-user/processor-user.component';
import { MemoryUserComponent } from './user/user-item/memory-user/memory-user.component';
import { PsuUserComponent } from './user/user-item/psu-user/psu-user.component';
import { MoniterUserComponent } from './user/user-item/moniter-user/moniter-user.component';
import { SpeackerUserComponent } from './user/user-item/speacker-user/speacker-user.component';
import { StorageUserComponent } from './user/user-item/storage-user/storage-user.component';
import { MouseUserComponent } from './user/user-item/mouse-user/mouse-user.component';
import { UsermotherboardDetailsComponent } from './user/user-item/motherboard-user/usermotherboard-details/usermotherboard-details.component';
import { ItemDetailsComponent } from './user/user-item/item-details/item-details.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    MotherboardUserComponent,
    VgaUserComponent,
    UserNavbarComponent,
    UserSidebarComponent,
    UserFooterComponent,
    UserBillComponent,
    UserCartComponent,
    UserFormComponent,
    LoginComponent,
    ProcessorUserComponent,
    MemoryUserComponent,
    PsuUserComponent,
    MoniterUserComponent,
    SpeackerUserComponent,
    StorageUserComponent,
    MouseUserComponent,
    UsermotherboardDetailsComponent,
    ItemDetailsComponent,

    /* admin item*/
 /*    VgaComponent,
    MotherboardComponent,
    RamComponent,
    ProcessorComponent,
    CreateMotherboardComponent,
    EditMotherboardComponent,
    AdminDashboardComponent,
    NewOrderComponent,
    ConfirmeOrderComponent,
    CancleOrderComponent,
    AdminFooterComponent,
    AdminComponent,
    AdminSideNavComponent,
    AdminNavigationComponent, */
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [orderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
