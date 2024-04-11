import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import { Subscription, interval, map } from 'rxjs';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pro-repro',
  templateUrl: './pro-repro.component.html',
  styleUrls: ['./pro-repro.component.css']
})
export class ProReproComponent implements OnInit {
  tmrUpdateSubscription!: Subscription;

  proReproForm!: FormGroup;
  urls = new APIURL();
  lotNo!: string;
  itemDescription!: string;
  itemKey!: number;
  uom!: number;
  prodNum!: string;
  quantity!: string;
  isLoading: boolean = false;
  selectedWeightValue: number | undefined;
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective; //to reset form
  @ViewChild('content') content!: ElementRef;

  workOrdersData: { prodNum: string, itemNum: string }[] = [];

  constructor(private fb: FormBuilder, private cService: CommonService) { }

  qr_value!: string;
  isVisible = false;

  ngOnInit(): void {
    this.initializeForm();
    this.bindWorkOrders();
    this.getLotNo();
    this.qr_value = "qr";
  }
  onKeyPress(event: KeyboardEvent) {
    // Allow backspace (charCode 8) and digits (charCodes 48-57)
    if (event.charCode !== 8 && (event.charCode < 48 || event.charCode > 57)) {
      event.preventDefault();
    }
  }
  makePdf() {
    this.isLoading = true;
    let doc = new jsPDF();
    doc.html(this.content.nativeElement, {
      callback: (pdf) => {
        pdf.save('Crown Poly Repro Record - QR.pdf');
        this.isVisible = false;
        this.isLoading = false;
        Swal.fire({
          icon: "success",
          title: "Production recorded successfully.",
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  initializeForm(): void {
    this.proReproForm = this.fb.group({
      prodNum: [''],
      itemNum: [''],
      lineNo: [],
      typeDesc: [''],
      typeWeight: [''],
      qty: ['', Validators.required],
      workOrders: ['', Validators.required],
      prodDate: [localStorage.getItem('prodDate')!.toString()], // from localstorage
      shift: [localStorage.getItem('shift')!.toString()], // from localstorage
      lineId: [localStorage.getItem('lineId')!.toString()], // from localstorage
      uom: [''],
      workCenter: ['REPRO'], // default value
      lotNumber: [''],
    });
  }

  onSubmit(): void {
    if(this.proReproForm.controls["qty"].value==0){
      Swal.fire({
        icon: "error",
        title: "The Quantity cannot be 0.",
      });
      return;
    }
    if (this.proReproForm.valid) {
      this.isLoading = true;


      // check prod order is open
      if (this.checkProdOrderOpen(this.prodNum)) {
        const { ...recordProduction } = this.proReproForm.value;
        recordProduction.prodNum = this.prodNum;
        recordProduction.lotNumber = this.lotNo.toString();
        recordProduction.uom = this.uom.toString();
        this.quantity = recordProduction.qty = recordProduction.qty.toString();
        if (recordProduction.qty <= 0) {
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
              
              this.openPDF(this.quantity);

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

  getItemKey() {
    this.prodNum = this.proReproForm.controls["workOrders"].value;
    this.cService.get(this.urls.getItemKey_API_URL + '/' + this.prodNum).subscribe({
      next: (data) => {
        this.itemKey = data.itemNo;
        this.getUom(this.itemKey.toString());
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getUom(itemKey: string) {
    const { ...proReproData } = this.proReproForm.value;
    proReproData.itemKey = itemKey.toString();

    this.cService.post(this.urls.getReproUom_API_URL, proReproData).subscribe({
      next: (data) => {
        this.uom = data.uom.toString();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openPDF(quantity: string) {
    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Crown Poly Repro Record', 20, 20);
    doc.setFontSize(14);

    doc.text("Production Date", 20, 35);
    doc.text(formatDate(localStorage.getItem('prodDate')!.toString(),'dd-MM-yyyy', 'en'), 70, 35);// from localStorage

    doc.text('Shift', 20, 45);
    doc.text(localStorage.getItem('shift')!.toString(), 70, 45);// from localStorage

    doc.text('Line No.', 20, 55);
    doc.text(localStorage.getItem('lineId')!.toString(), 70, 55);// from localStorage

    doc.text('Lot Number', 20, 65);
    doc.text(this.lotNo.toString(), 70, 65);

    doc.text('Net Weight', 20, 75);
    doc.text(quantity, 70, 75);

    doc.text('Entered Date', 20, 85);
    doc.text(formatDate(new Date(), 'dd-MM-yyyy', 'en'), 70, 85);

    doc.text('Entered By', 20, 95);
    doc.text(localStorage.getItem("userName")!.toString(), 70, 95);

    doc.getTextDimensions("20");

    doc.save('Crown Poly Repro Record.pdf');

    this.qr_value = "repro_" + this.lotNo + "_" + localStorage.getItem('lineId')!.toString() + "_" + this.itemKey + "_" + this.quantity + "_" + formatDate(new Date(), 'dd-MM-yyyy', 'en'); // from localStorage
    this.isVisible = true;
    this.tmrUpdateSubscription = interval(1000).pipe(
      map(() => {
        this.makePdf();
      })
    ).subscribe(() => {
      // Unsubscribe to stop the interval
      if (this.tmrUpdateSubscription) {
        this.tmrUpdateSubscription.unsubscribe();
      }
    });
  }

  getLotNo() {
    this.isLoading = true;
    const { ...proReproData } = this.proReproForm.value;
    proReproData.prodDate = localStorage.getItem('prodDate')!.toString(); // from localstorage
    proReproData.shift = localStorage.getItem('shift')!.toString(); // from localstorage
    this.cService.post(this.urls.getReproLotNo_API_URL, proReproData).subscribe({
      next: (data: any) => {
        this.lotNo = data.lotNo;
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
        this.workOrdersData =  data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  RefreshWorkOrders() {
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