import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { UserComponent } from './user/user.component';
/* import { MotherboardComponent } from './admin/admin-item/motherboard/motherboard.component';
import { VgaComponent } from './admin/admin-item/vga/vga.component';
import { AdminComponent } from './admin/admin.component';
import { ProcessorComponent } from './admin/admin-item/processor/processor.component'; */
import { MotherboardUserComponent } from './user/user-item/motherboard-user/motherboard-user.component';
import { VgaUserComponent } from './user/user-item/vga-user/vga-user.component';
/* import { CreateMotherboardComponent } from './admin/admin-item/motherboard/create-motherboard/create-motherboard.component';
import { EditMotherboardComponent } from './admin/admin-item/motherboard/edit-motherboard/edit-motherboard.component'; */
import { UserCartComponent } from './user/user-cart/user-cart.component';
import { UserFormComponent } from './user/user-form/user-form.component';
/* import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NewOrderComponent } from './admin/admin-dashboard/new-order/new-order.component';
import { ConfirmeOrderComponent } from './admin/admin-dashboard/confirme-order/confirme-order.component';
import { CancleOrderComponent } from './admin/admin-dashboard/cancle-order/cancle-order.component'; */
import { UserBillComponent } from './user/user-bill/user-bill.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { UsermotherboardDetailsComponent } from './user/user-item/motherboard-user/usermotherboard-details/usermotherboard-details.component';
import { MemoryUserComponent } from './user/user-item/memory-user/memory-user.component';
import { ProcessorUserComponent } from './user/user-item/processor-user/processor-user.component';
import { PsuUserComponent } from './user/user-item/psu-user/psu-user.component';
import { MoniterUserComponent } from './user/user-item/moniter-user/moniter-user.component';
import { SpeackerUserComponent } from './user/user-item/speacker-user/speacker-user.component';
import { StorageUserComponent } from './user/user-item/storage-user/storage-user.component';
import { MouseUserComponent } from './user/user-item/mouse-user/mouse-user.component';
import { ItemDetailsComponent } from './user/user-item/item-details/item-details.component';



const routes: Routes = [

  {path : 'home',component : HomeComponent},
  {path : '', redirectTo : 'home' , pathMatch : 'full'},

  {path :'store' , component : UserComponent, 
  children :[
    { path: '', redirectTo: 'user/motherboard', pathMatch: 'full' },

    {path :'user/motherboard', component : MotherboardUserComponent},
    { path : 'user/motherboard/:id' , component : UsermotherboardDetailsComponent},

    {path : 'user/item/details/:id' , component : ItemDetailsComponent},
  
    {path :'user/vga', component : VgaUserComponent}, 

    {path :'user/processor', component : ProcessorUserComponent},

    {path :'user/memory', component : MemoryUserComponent},

    {path :'user/psu', component : PsuUserComponent},

    {path :'user/moniter', component : MoniterUserComponent},

    {path :'user/sound', component : SpeackerUserComponent},

    {path :'user/storage', component : StorageUserComponent},

    {path :'user/keyboardMouse', component : MouseUserComponent},





    
  ]},
  {path: 'store/user/cart' , component : UserCartComponent },
  {path: 'store/user/cart/form' , component : UserFormComponent },
  {path: 'store/user/cart/bill' , component : UserBillComponent },


  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin-module/admin/admin.module').then((m) => m.AdminModule),
  },






    

  
]
  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
