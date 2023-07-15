import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.css']
})
export class UserFooterComponent {

  constructor ( private router : Router){}

  vgaNav(){
    this.router.navigate(['store/user/vga'])
     }
   
     motherboardNav(){
      this.router.navigate(['store/user/motherboard'])
     }
   
     processorNav(){
       this.router.navigate(['store/user/processor'])
      }
   
      psuNav(){
       this.router.navigate(['store/user/psu'])
      }
   
      moniterNav(){
       this.router.navigate(['store/user/moniter'])
      }
   
      spkNav(){
       this.router.navigate(['store/user/sound'])
      }
   
      strNav(){
       this.router.navigate(['store/user/storage'])
      }
   
      kybMusNav(){
       this.router.navigate(['store/user/keyboardMouse'])
      }
   
     memoryNav(){
       this.router.navigate(['store/user/memory'])
      }
    

}
