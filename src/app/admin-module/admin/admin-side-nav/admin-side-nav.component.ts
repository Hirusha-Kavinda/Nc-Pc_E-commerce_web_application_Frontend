import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.css']
})
export class AdminSideNavComponent {



  constructor( private router : Router, ){}

onVga(){this.router.navigate(['admin/vga'])}

 onMotherboard(){this.router.navigate (['admin/motherboard'])   }

 onDashbord(){this.router.navigate(['admin/dashboard'])}
 
 onMemory(){this.router.navigate(['admin/memory'])}

 onMoniter(){this.router.navigate(['admin/moniter'])}

 onPsu(){this.router.navigate(['admin/psu'])}

 onProcessor(){this.router.navigate(['admin/processor'])}

 onStorage(){this.router.navigate(['admin/storage'])}

 onSpeacker(){this.router.navigate(['admin/speacker'])}

 onKeyboardMouse(){this.router.navigate(['admin/keyboardmouse'])}
}
