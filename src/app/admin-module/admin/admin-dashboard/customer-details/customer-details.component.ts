import { Component } from '@angular/core';
import { customerd } from './customer-model';
import { customerService } from './customer-service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {


  customers: customerd[];
  uniqueNICs: Set<string> = new Set();
  nicDetails: { nic: string, count: number, canceledCount: number, confirmedCount: number, pendingCount: number, order: customerd }[] = [];
  searchNIC: string;
  filteredNICDetails: { nic: string, count: number, canceledCount: number, confirmedCount: number, pendingCount: number, order: customerd }[] = [];

  constructor(private customerservice: customerService) {}

  ngOnInit(): void {
    this.customerservice.getCustomer().subscribe(
      (data: customerd[]) => {
        this.customers = data;
        this.getUniqueNICs();
        this.getNICDetails();
        this.filterNICDetails();
      },
      error => {
        console.log('An error occurred:', error);
      }
    );
  }

  getUniqueNICs(): void {
    this.customers.forEach(customer => {
      this.uniqueNICs.add(customer.nic);
    });
  }

  getNICDetails(): void {
    this.uniqueNICs.forEach(nic => {
      const orders = this.customers.filter(c => c.nic === nic);
      const count = orders.length;
      const canceledCount = orders.filter(o => o.states === 'cancle').length;
      const confirmedCount = orders.filter(o => o.states === 'confirme').length;
      const pendingCount = orders.filter(o => o.states === 'pending').length;
      const order = orders[0]; // Get the first order for the NIC
      this.nicDetails.push({ nic, count, canceledCount, confirmedCount, pendingCount, order });
    });
  }

  filterNICDetails(): void {
    if (!this.searchNIC) {
      this.filteredNICDetails = this.nicDetails;
    } else {
      const searchTerm = this.searchNIC.toLowerCase().trim();
      this.filteredNICDetails = this.nicDetails.filter(nicDetail => nicDetail.nic.toLowerCase().includes(searchTerm));
    }
  }




}
