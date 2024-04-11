import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { jsPDF } from 'jspdf';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pro-mr',
  templateUrl: './pro-mr.component.html',
  styleUrls: ['./pro-mr.component.css']
})
export class ProMRComponent implements OnInit {
  proMRForm!: FormGroup;
  urls = new APIURL();
  palletTypes = [];
  lotNo!: string;
  itemDescription!: string;
  itemKey!: number;
  isLoading: boolean = false;
  selectedWeightValue: number | undefined;
  @ViewChild('workOrdersSelect') workOrdersSelect!: MatSelect;
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective; //to reset form

  filterText: string = '';
  workOrdersData: { prodNum: string, itemNum: string }[] = [];
  palletTypesData: { typeDesc: string, weight: number }[] = [];
  ItemData: { itemKey: number}[] = [];
  constructor(private fb: FormBuilder, private cService: CommonService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.bindWorkOrders();
    this.bindPalletTypes();
    this.getLotNo();
  }

  initializeForm(): void {
    this.proMRForm = this.fb.group({
      prodNum: [''],
      itemNum: [''],
      typeArea: ['MR'], // default value MR
      lineNo: [],
      typeDesc: [''],
      typeWeight: [''],
      qty: ['', Validators.required],
      workOrders: ['', Validators.required],
      palletTypes: ['', Validators.required],
      prodDate: [localStorage.getItem('prodDate')!.toString()], // from localstorage
      shift: [localStorage.getItem('shift')!.toString()], // from localstorage
      lineId: [localStorage.getItem('lineId')!.toString()], // from localstorage
      uom: ['LBS'], // default value
      workCenter: ['HIPPO SAK EXTRUSION'], // default value
      lotNumber: [''],
    });
  }

  onSubmit(): void {
    if(this.proMRForm.controls["qty"].value==0){
      Swal.fire({
        icon: "error",
        title: "The Quantity cannot be 0.",
      });
      return;
    }
    if (this.proMRForm.valid) {
      this.isLoading = true;
      let prodNum = this.proMRForm.controls["workOrders"].value;
      let quantity = this.proMRForm.controls["qty"].value;

      // check prod order is open
      if (this.checkProdOrderOpen(prodNum)) {
        const { ...recordProduction } = this.proMRForm.value;
        recordProduction.prodNum = prodNum;
        // recordProduction.lotNumber = this.lotNo.toString();
        recordProduction.lotNumber = this.lotNo;
        let netWeight = quantity - this.selectedWeightValue!;
        recordProduction.qty = netWeight.toString(); // quantity to check in sp.
        if (netWeight <= 0) {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          Swal.fire({
            icon: "error",
            title: "Not enought quantity!",
            text: "Output Quantity must be a positive number",
          });
        }
        else {
          this.cService.post(this.urls.recordProduction_API_URL, recordProduction).subscribe({
            next: () => {
              setTimeout(() => {
                this.isLoading = false;
              }, 500);
              
              this.getItemKey(prodNum, quantity, netWeight);
              // reset form
              this.resetForm();
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      }
      else {
        Swal.fire({
          icon: "error",
          title: "The production order is no longer open",
        });
      }
    }
  }

  getItemKey(prodNum: any, quantity: any, weight: any) {
    this.cService.get(this.urls.getItemKey_API_URL + '/' + prodNum).subscribe({
      next: (data) => {
        this.itemKey= data.itemNo;
        this.getItemDetails(this.itemKey, quantity, weight, prodNum);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  getItemDetails(itemKey: number, quantity: any, weight: any, prodNum: any) {
    this.cService.post(this.urls.getItemDetails_API_URL + '/' + itemKey).subscribe({
      next: (data) => {
        this.itemDescription = data[0].description;
        this.openPDF(quantity, weight, prodNum);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openPDF(quantity: any, netWeight: any, prodNum: any) {
    var doc = new jsPDF();
    doc.text('Crown Poly Master Roll Record', 20, 20);
    doc.setFontSize(28);

    doc.text("*" + this.lotNo + "*", 35, 35);
    doc.setFontSize(14);

    doc.text('Item Number', 20, 45);
    doc.text(this.itemKey.toString(), 70, 45);

    doc.text('Description', 20, 55);
    var descriptionLines = doc.splitTextToSize(this.itemDescription.toString(),120); // Adjust width as needed
    doc.text(descriptionLines, 70, 55);

    doc.text('Order No', 20, 75);
    doc.text(prodNum.toString(), 70, 75);

    doc.text('Line', 20, 85);
    doc.text(localStorage.getItem('lineId')!.toString(), 70, 85); // from localStorage

    doc.text('Production Date', 20, 95);
    doc.text( formatDate(localStorage.getItem('prodDate')!.toString(),'dd-MM-yyyy', 'en'),70, 95);  // from localStorage

    doc.text('Shift', 20, 105);
    doc.text(localStorage.getItem('shift')!.toString(), 70, 105); // from localStorage

    doc.text('Gross Weight', 20, 115);
    doc.text(quantity.toString(), 70, 115);

    doc.text('Net Weight', 20, 125);
    doc.text(netWeight.toString(), 70, 125);
    doc.getTextDimensions("20");

    doc.text('Entered Date', 20, 135);
    doc.text(formatDate(new Date(), 'dd-MM-yyyy', 'en'), 70, 135);

    doc.text('Entered By', 20, 145);
    doc.text(localStorage.getItem("userName")!.toString(), 70, 145); 
    doc.save('Crown Poly Master Roll Record.pdf');
    Swal.fire({
      icon: "success",
      title: "Production recorded successfully.",
      showConfirmButton: false,
      timer: 2000
    });
  }


  getLotNo() {
    let lineId = localStorage.getItem('lineId')!.toString(); // from localstorage
    this.isLoading = true;
    this.cService.get(this.urls.getMRLotNo_API_URL + '/' + lineId).subscribe({
      next: (data) => {
        this.lotNo = data[0].mrLotNumber;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  bindWorkOrders() {
    let lineNo = localStorage.getItem('lineId')!.toString(); // from localstorage
    this.isLoading = true;
    this.cService.get(this.urls.getWorkOrders_API_URL + '/' + lineNo).subscribe({
      next: (data: { prodNum: string, itemNum: string }[]) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.workOrdersData = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  bindPalletTypes() {
    this.isLoading = true;
    let typeArea = this.proMRForm.controls["typeArea"].value;
    this.cService.get(this.urls.getCoreTypes_API_URL + '/' + typeArea).subscribe({
      next: (data: { typeDesc: string, weight: number }[]) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.palletTypesData = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  RefreshWorkOrdersAndPalletTypes() {
    this.isLoading = true;
    this.resetForm();
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  checkProdOrderOpen(prodNum: string): boolean {
    this.cService.get(this.urls.checkProdOrderOpen_API_URL + '/' + prodNum).subscribe({
      next: (data: { prodNum: string, itemNum: string }[]) => {
        if (data != null) {
          return true;
        }
        else {
          return false;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
    return true;
  }


  resetForm() {
    this.formDirective.resetForm();
    this.initializeForm();
  }

}
