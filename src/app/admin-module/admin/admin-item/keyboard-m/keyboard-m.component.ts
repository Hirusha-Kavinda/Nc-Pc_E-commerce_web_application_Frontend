import { Component } from '@angular/core';
import { KeyboardM } from './keyboard-m-model';
import { KeyboardMService } from './keyboard-m-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-keyboard-m',
  templateUrl: './keyboard-m.component.html',
  styleUrls: ['./keyboard-m.component.css']
})
export class KeyboardMComponent {
  keym : KeyboardM[];


  constructor (private keymservice : KeyboardMService  , private router : Router){}

  ngOnInit(): void {
    this.getKeyboardMList();
  }

  private getKeyboardMList(){
    this.keymservice.getKeyboardMList().subscribe(data =>{
      this.keym =data.filter(vga => vga.categoryID === 900);
    });
  }

  addNewKeyboardM(){
    this.router.navigate(['admin/keyboardmouse/new'])
  }

  updateKeyboardM(id:number){
  this.router.navigate(['admin/keyboardmouse/update',id]);
 
}

deleteKeyboardM(id : number){
  this.keymservice.deleteKeyboardM(id).subscribe({
    next : data => { console.log(data); this.getKeyboardMList();}
  })
  this.router.navigate(['admin/keyboardmouse'])
}

KeyboardMDetails(id : number){
this.router.navigate(['admin/keyboardmouse/details/',id]);

}

}
