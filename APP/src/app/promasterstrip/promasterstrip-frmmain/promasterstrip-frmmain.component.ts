import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import { formatDate } from '@angular/common';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promasterstrip-frmmain',
  templateUrl: './promasterstrip-frmmain.component.html',
  styleUrls: ['./promasterstrip-frmmain.component.css']
})

export class PromasterstripFrmmainComponent implements OnInit {
  proMasterStripForm!: FormGroup;
  urls = new APIURL();
  coreTypes = [];
  lotNo!: number;
  itemKey!: number;
  isLoading: boolean = false;
  selectedWeightValue: number | undefined;
  @ViewChild('workOrdersSelect') workOrdersSelect!: MatSelect;
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective; //to reset form

  filterText: string = '';
  workOrdersData: { prodNum: string, itemNum: string }[] = [];
  coreTypesData: { typeDesc: string, weight: number }[] = [];

  constructor(private fb: FormBuilder, private cService: CommonService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.bindWorkOrders();
    this.bindCoreTypes();
    this.getLotNo();
  }

  initializeForm(): void {
    this.proMasterStripForm = this.fb.group({
      prodNum: [''],
      itemNum: [''],
      typeArea: ['MS'], // default value MS 
      lineNo: [],
      typeDesc: [''],
      typeWeight: [''],
      qty: ['', Validators.required],
      workOrders: ['', Validators.required],
      coreTypes: ['', Validators.required],
      prodDate: [localStorage.getItem('prodDate')!.toString()], // from localstorage
      shift: [localStorage.getItem('shift')!.toString()], // from localstorage
      lineId: [localStorage.getItem('lineId')!.toString()], // from localstorage
      uom: ['LBS'], // default value
      workCenter: ['HIPPO SAK STRIP'], // default value
      lotNumber: [''],
    });
  }

  // SAVE RECORD PRODUCTION
  onSubmit(): void {
    if(this.proMasterStripForm.controls["qty"].value==0){
      Swal.fire({
        icon: "error",
        title: "The Quantity cannot be 0.",
      });
      return;
    }
    if (this.proMasterStripForm.valid) {
      this.isLoading = true;
      let prodNum = this.proMasterStripForm.controls["workOrders"].value;
      let quantity = this.proMasterStripForm.controls["qty"].value;

      // check prod order is open
      if (this.checkProdOrderOpen(prodNum)) {
        const { ...recordProduction } = this.proMasterStripForm.value;
        recordProduction.prodNum = prodNum;
        recordProduction.lotNumber = this.lotNo.toString();
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

  openPDF(quantity: any, netWeight: any) {
    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Crown Poly Master Strip Roll Record', 20, 20);
    doc.setFontSize(14);

    doc.text('Production Date', 20, 35);
    doc.text(formatDate(localStorage.getItem('prodDate')!.toString(),'dd-MM-yyyy', 'en'), 70, 35); // from localStorage

    doc.text('Shift', 20, 45);
    doc.text(localStorage.getItem('shift')!.toString(), 70, 45); // from localStorage

    doc.text('Item Number', 20, 55);
    doc.text(this.itemKey.toString(), 70, 55);

    doc.text('Lot Number', 20, 65);
    doc.text(this.lotNo.toString(), 70, 65);
    doc.setFontSize(32);
    doc.text("*" + this.lotNo.toString() + "*", 120, 65);

    doc.setFontSize(14);
    doc.text('Gross Weight', 20, 75);
    doc.text(quantity.toString(), 70, 75);

    doc.text('Net Weight', 20, 85);
    doc.text(netWeight.toString(), 70, 85);
    doc.getTextDimensions("20");

    doc.text('Entered Date', 20, 95);
    doc.text(formatDate(new Date(), 'dd-MM-yyyy', 'en'), 70, 95);

    doc.text('Entered By', 20, 105);
    doc.text(localStorage.getItem("userName")!.toString(), 70, 105);
    doc.save('Crown Poly Master Strip Roll Record.pdf');

    Swal.fire({
      icon: "success",
      title: "Production recorded successfully.",
      showConfirmButton: false,
      timer: 2000
    });
  }

  getItemKey(prodNum: any, quantity: any, weight: any) {
    this.cService.get(this.urls.getItemKey_API_URL + '/' + prodNum).subscribe({
      next: (data) => {
        this.itemKey = data.itemNo;
        this.openPDF(quantity, weight);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getLotNo() {
    this.cService.get(this.urls.getLotNo_API_URL).subscribe({
      next: (data) => {
        this.lotNo = data[0].msLotNumber;
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

  bindCoreTypes() {
    this.isLoading = true;
    let typeArea = this.proMasterStripForm.controls["typeArea"].value;
    this.cService.get(this.urls.getCoreTypes_API_URL + '/' + typeArea).subscribe({
      next: (data: { typeDesc: string, weight: number }[]) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.coreTypesData = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  RefreshWorkOrdersAndCoreTypes() {
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