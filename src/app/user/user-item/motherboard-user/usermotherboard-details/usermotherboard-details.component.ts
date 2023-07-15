import { Component } from '@angular/core';
import { MotherboardUser } from '../motherboard-user-model';
import { ActivatedRoute, Router } from '@angular/router';
import { MotherboardUserService } from '../motherboard-user-service';

@Component({
  selector: 'app-usermotherboard-details',
  templateUrl: './usermotherboard-details.component.html',
  styleUrls: ['./usermotherboard-details.component.css']
})
export class UsermotherboardDetailsComponent {

  id : number
  motherboard : MotherboardUser
  motherboards : MotherboardUser[]


  constructor(private route: ActivatedRoute , 
    private motherboardService : MotherboardUserService,
    private router : Router){}


    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
  
      this.motherboard = new MotherboardUser();
      this.motherboardService.getMotherboardId(this.id).subscribe(data => {
        this.motherboard = data;
      });
    }


}
