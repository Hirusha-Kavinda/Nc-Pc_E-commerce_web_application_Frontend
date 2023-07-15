import { Component, OnInit } from '@angular/core';
import { sells } from '../sells/sells-model';
import { sellsService } from '../sells/sells-service';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-total-sells',
  templateUrl: './total-sells.component.html',
  styleUrls: ['./total-sells.component.css']
})
export class TotalSellsComponent {


  sells : sells[] ;
  filteredSells: sells[];
  startDate: Date;
  endDate: Date;


  ngOnInit(){

    this.getMemoryList();
   
     }


     constructor( private sellsService : sellsService){}

  
     private getMemoryList() {
      this.sellsService.getSells().subscribe(data => {
        this.sells = data;
        this.applyFilters();
      });
    }
  
    applyFilters() {
      this.filteredSells = this.sells.filter(sell => {
        const sellDate = new Date(sell.date);
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        return (
          (!this.startDate || sellDate >= start) &&
          (!this.endDate || sellDate <= end)
        );
      });
    }

    calculateTotalIncome(): number {
      let totalIncome = 0;
      for (const sell of this.filteredSells) {
        totalIncome += sell.qnt * sell.price;
      }
      return totalIncome;
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
      const fileName = 'Total_Sells.xlsx';
      writeFile(workbook, fileName);
    }




}
