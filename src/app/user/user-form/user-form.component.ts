import { Component , ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { orderService } from './order-service';
import { Customer, Product } from './order-model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserBillComponent } from '../user-bill/user-bill.component';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @ViewChild('popupContent', { static: true }) popupContent!: ElementRef;


formGroup!: FormGroup;
orderData?: any;
showPopup = false;


  constructor(private router : Router ,
              private orderService : orderService,
              private formBuilder: FormBuilder){}



  ngOnInit(): void {

   





    // validations 
      this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, this.validateName]],
       nic: ['', [Validators.required, this.validateNIC]],
       email: ['', [Validators.required, Validators.email, this.validateEmail]],
       address: ['', [Validators.required, this.validateAddress]],
       mobileNumber: ['', [Validators.required, this.validateMobileNumber]]
    });
    
  
    const customer = JSON.parse(localStorage.getItem('customer') || '{}');
  }





  getTotalPrice(): number {
    if (this.orderData?.products) {
      let totalPrice = 0;
      for (let product of this.orderData.products) {
        totalPrice += (product?.price || 0) * (product?.qnt || 0);
      }
      return totalPrice;
    }
    return 0;
  }


  openPopup() {
    this.showPopup = true;
   
  }

  closePopup() {
    this.showPopup = false;
    this.downloadAsPDF()
    this.onNavigate()


    Swal.fire({
      icon : 'success',
      iconColor : '#41fca3',
      title :"<h2 style='color:White'>" +'Thank you !..' +"<br>"+' order is succesfully'+"<br><br>"+"<h5 style='color:White'>"+'we give temporary invoice for your proof '+"<br><br>"+ 'You will be notified via email within 24 hours that the order has been accepted.'+"</h2>",
      background : '#303A42'
    }) 
  }



  downloadAsPDF(): void {
    const doc = new jsPDF();
  
    const content = this.popupContent.nativeElement;
  
    html2canvas(content, {
      scrollY: -window.scrollY,
      windowHeight: content.scrollHeight
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png' , 1.0);
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      doc.setFillColor(255, 255, 255); // Set background color for the PDF
      doc.rect(0, 0, pdfWidth, pdfHeight, 'F'); // Draw a filled rectangle with the background color
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('proof_invoice.pdf');
    });
  }



















  products: Product[] = [];
  formData = { name: '', nic : '' , email: '' , phoneNumber:'' , address:'' }; // Variable to store form data



  
 


  onFormSubmit() {
     

     // Check if any field is invalid
   

    // Store form data in localStorage
    sessionStorage.setItem('formData', JSON.stringify(this.formData));

    // Retrieve form data from localStorage and assign it to a variable
    const storedFormData = sessionStorage.getItem('formData');
    if (storedFormData) {
      this.formData = JSON.parse(storedFormData);
    }

   this.conformation()
  

  }

  placeOrder(): void {
    // Retrieve form data from localStorage and assign it to a variable
    const storedFormData = sessionStorage.getItem('formData');
    let formData: Customer = { name: '', email: '', nic:'', address: '', phoneNumber: '', products: [] };
    if (storedFormData) {
      formData = JSON.parse(storedFormData);
    }
  
    // Retrieve items array from localStorage
    const storedItems = sessionStorage.getItem('localCart');
    let items: Product[] = [];
    if (storedItems) {
      items = JSON.parse(storedItems);
    }
  
    // Add items array to formData object
    formData.products = items;
  
    // Send formData to API
    this.orderService.placeOrder(formData).subscribe({
      next : (response) =>  { console.log(response);
        this.orderData = response;
       
        
       },
      error :(error) => {console.log(error);
      }
    });

    
  }




 onNavigate(){
  this.router.navigate(['store/user/motherboard'])

 }

 ondelete(){ 
  sessionStorage.removeItem('localCart');

 }

 onthebill(){
  this.router.navigate(['store/user/cart/bill'])

 }


 conformation(){
  Swal.fire({
    title : "<h2 style='color:White'>" +'Are you sure Submit you order'+"<br><br>"+"<h5 style='color:White'>"+ 'If You place order, You will receive the order at home within three days.'+ '<br><br>' +"<h5 style='color: red'>"+'you want cancle this order,you can cancel the order by phone call within 24 hours.'+   "</h2>",
    icon : 'warning',
    showCancelButton : true,
    confirmButtonText : 'Yes confirm ',
    cancelButtonText : 'No keep it',
    background : '#303A42'
  }).then((result) =>{ 
    if (result.value) {

      this.placeOrder()
     
      this.openPopup()

      this.ondelete()
   

      
    
   

    
  }
  else if (result.dismiss === Swal.DismissReason.cancel){
Swal.fire({
        icon : 'error',
        title: "<h2 style='color:White'>"+'Cancelled'+"<br><br>"+"<h5 style='color:White'>"+ 'Your order cacelled '+"</h2>",
        background : '#303A42'
      });

      this.onNavigate()
      
      
}      
 }) 

}


















//    user form validation


 validateName(control: AbstractControl): { [key: string]: boolean } | null {
  const namePattern = /^[A-Za-z\s]+$/; // Regular expression to allow only alphabets and spaces

  if (!namePattern.test(control.value)) {
    return { invalidName: true };
  }
  const words = control.value.split(' ');
  if (words.length < 3) {
    return { insufficientWords: true };
  }

  return null;
}


validateNIC(control: AbstractControl): { [key: string]: boolean } | null {
 
  const nicPattern = /^[0-9]{9}(v|V)|^[0-9]{12}$/; // Regular expression for NIC format

  if (!nicPattern.test(control.value)) {
    return { invalidNIC: true };
  }

  return null;
}


validateEmail(control: AbstractControl): { [key: string]: boolean } | null {
  const email = control.value;

  // Check if email is empty
  if (!email) {
    return { required: true };
  }

  // Check for @ symbol
  if (email.indexOf('@') === -1) {
    return { invalidEmail: true };
  }

  // Split email into local part and domain part
  const parts = email.split('@');
  const localPart = parts[0];
  const domainPart = parts[1];

  // Check if domain part is one of the allowed domains
  const allowedDomains = ['gmail.com'];
  if (allowedDomains.indexOf(domainPart) === -1) {
    return { invalidDomain: true };
  }

  // Check if local part contains any invalid characters
  const invalidCharacters = /[,]/;
  if (invalidCharacters.test(localPart)) {
    return { invalidLocalPart: true };
  }

  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Regular expression for email format

  if (!emailPattern.test(control.value)) {
    return { email: true };
  }

  if (/[^\w.]/.test(localPart)) {
    return { invalidLocalPart: true };
  }                                                                                             

  return null;
}


validateAddress(control: AbstractControl): { [key: string]: boolean } | null {
  const address = control.value;

  // Regular expression to match a valid Sri Lankan address
  const addressPattern = /^[A-Za-z0-9\s,-/]+(?:\s+[A-Za-z0-9\s,-/]+){2,}$/;

  if (!addressPattern.test(address)) {
    return { invalidAddress: true };
  }

  return null;
}




validateMobileNumber(control: AbstractControl): { [key: string]: boolean } | null {
  const mobileNumber = control.value;
   // Check if mobile number is empty
if (!mobileNumber) {
  return { required: true };
}

  // Regular expression to match a valid Sri Lankan mobile phone number
  const mobileNumberPattern = /^(?:\+?94|0)(?:7[0-9]{8})$/;

  if (!mobileNumberPattern.test(mobileNumber)) {
    return { invalidMobileNumber: true };
  }

  return null;
}










  
 }




