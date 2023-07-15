import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.css']
})
export class AdminFooterComponent {

  constructor( private router : Router){}


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
