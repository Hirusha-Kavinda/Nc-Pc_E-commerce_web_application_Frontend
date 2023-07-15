import { Component , OnInit} from '@angular/core';
import { sellsService } from './sells-service';
import { sells } from './sells-model';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.css']
})
export class SellsComponent {

  sells  : sells[];
  filteredSells: sells[];
  filteredSellsItem: any;
  searchName: string = '';
  unitTableData: sells[];

  startDate: Date;
  endDate: Date;

  totalQuantity: number;
  totalPrice: number;
  
 
 


  
  constructor( private sellsService : sellsService){} 

  ngOnInit(){

 this.getSellsList()
 this.getUnitTableData();
 this.filterSells();
 this.calculateTotals();





  }

  private getSellsList(){
      this.sellsService.getSells().subscribe({
      next : data =>{
      this.sells = data;
      this.filteredSells = this.sells; 
     /*  this.calculateSummary(); */
    },

    error: error => {
      console.log('Error occurred while retrieving sells:', error);
    }
    
  });
  }

  private getUnitTableData() {
    this.sellsService.getSells().subscribe({
      next: data => {
        this.unitTableData = data;
      },
      error: error => {
        console.log('Error occurred while retrieving unit table data:', error);
      }
    });
  }



  filterSells() {
    if (this.sells && this.sells.length > 0) {
      if (this.searchName.trim() !== '') {
        this.filteredSells = this.sells.filter(
          sell =>
            sell.name.toLowerCase().includes(this.searchName.toLowerCase())
        );
      } else {
        this.filteredSells = this.sells;
      }
  

      if (this.startDate && this.endDate) {
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        endDate.setDate(endDate.getDate() + 1); // Include end date in the range
  
        this.filteredSells = this.filteredSells.filter(
          sell => {
            const sellDate = new Date(sell.date);
            return sellDate >= startDate && sellDate < endDate;
          }
        );
      } 




      const filteredItemSells = this.filteredSells.filter(
        sell => sell.name === this.searchName
      );
  
      const totalQuantity = filteredItemSells.reduce(
        (total, sell) => total + sell.qnt,
        0
      );
      const totalPrice = filteredItemSells.reduce(
        (total, sell) => total + sell.subtotal,
        0
      );
  
      this.filteredSellsItem = {
        id: 0,
        date: new Date(),
        name: this.searchName,
        price: 0,
        qnt: totalQuantity,
        subtotal: totalPrice,
        totalQuantity: totalQuantity,
        totalPrice: totalPrice
      };
    }
  }
  
  

/*   selectItem(item: sells) {
    this.filteredSellsItem = item;

    const selectedTotalQuantity = this.filteredSells
      .filter(sell => sell.name === item.name)
      .reduce((total, sell) => total + (sell.qnt), 0);

    const selectedTotalPrice = this.filteredSells
      .filter(sell => sell.name === item.name)
      .reduce((total, sell) => total + (sell.price * sell.qnt), 0);

    this.filteredSellsItem.totalQuantity = selectedTotalQuantity;
    this.filteredSellsItem.totalPrice = selectedTotalPrice;
  } */

  selectItem(item: sells) {
    this.filteredSellsItem = item;
  
    const selectedTotalQuantity = this.filteredSells
      .filter(sell => sell.name === item.name)
      .reduce((total, sell) => total + sell.qnt, 0);
  
    const selectedTotalPrice = this.filteredSells
      .filter(sell => sell.name === item.name)
      .reduce((total, sell) => total + (sell.price * sell.qnt), 0);
  
    this.filteredSellsItem.totalQuantity = selectedTotalQuantity;
    this.filteredSellsItem.totalPrice = selectedTotalPrice;
  }
  
  clearSelection() {
    this.filteredSellsItem = {
      id: 0,
      date: new Date(),
      name: 'Select item',
      price: 0,
      qnt: 0,
      subtotal: 0,
      totalQuantity: 0,
      totalPrice: 0
    };
  }




  exportToExcel() {
    // Prepare the data array for export
    const data = this.filteredSells.map(sell => {
      return {
        'Name': sell.name,
        'Date': sell.date,
        'Price': sell.price,
        'Quantity': sell.qnt,
        'Subtotal': sell.price* sell.qnt
      };
    });
  
    // Define the worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
  
    // Define the workbook and add the worksheet to it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // Convert the workbook to an Excel binary string
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Create a blob from the Excel binary string
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Save the blob as a file
    const fileName = 'device_sells.xlsx';
    writeFile(workbook, fileName);
  }
  



  private calculateTotals() {
    if (this.filteredSells && this.filteredSells.length > 0) {
      this.totalQuantity = this.filteredSells.reduce((total, sell) => total + sell.qnt, 0);
      this.totalPrice = this.filteredSells.reduce((total, sell) => total + (sell.price * sell.qnt), 0);
    } else {
      this.totalQuantity = 0;
      this.totalPrice = 0;
    }
  }


  
}
