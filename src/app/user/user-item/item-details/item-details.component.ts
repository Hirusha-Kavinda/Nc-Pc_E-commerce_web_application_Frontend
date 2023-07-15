import { Component } from '@angular/core';
import { Item } from '../memory-user/usermemory-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../memory-user/usermemory-service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent {

id : number
item : Item

constructor(private route: ActivatedRoute , 
  private itemService : ItemService,
  private router : Router){}




  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.item = new Item();
    this.itemService.getItemId(this.id).subscribe(data => {
      this.item = data;
    });


  

  }






}
