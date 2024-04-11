import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { jsPDF } from 'jspdf';
import { Subscription, interval, map } from 'rxjs';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pro-scrap',
  templateUrl: './pro-scrap.component.html',
  styleUrls: ['./pro-scrap.component.css']
})
export class ProScrapComponent implements OnInit {
  tmrUpdateSubscription!: Subscription;
  ItemKey!: string;
  proScrapForm!: FormGroup;
  urls = new APIURL();
  isLoading: boolean = false;
  grossWeight: any;
  prevGrossWeight: any;
  netWeight: any;
  containerName!: string;
  comments!: string;
  department!: string;
  lineId!: string;
  departmentData: [] = [];
  linesData: [] = [];
  scrapKeyData: [] = [];
  containerData: { typeDesc: string, weight: number }[] = [];
  selectedContainerValue: number | undefined;
  selectedDep!: string;
  qr_value!: string;
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective; //to reset form
  @ViewChild('content') content!: ElementRef;

  constructor(private fb: FormBuilder, private cService: CommonService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.bindDepartments();
    this.bindContainer();
    this.qr_value = "qr";
  }

  initializeForm(): void {
    this.proScrapForm = this.fb.group({
      departments: ['', Validators.required],
      ItemKey: ['', Validators.required],
      container: ['', Validators.required],
      grossWeight: ['', Validators.required],
      prevWeight: ['', Validators.required],
      comments: ['', Validators.required],
      prodDate: [localStorage.getItem('prodDate')!.toString()], // from localstorage
      shift: [localStorage.getItem('shift')!.toString()], // from localstorage
      lineId: ['', Validators.required],
      qty: [''],
    });
  }

  setContainerName(event: MatSelectChange) {
    this.containerName = event.source.triggerValue;
  }

  onSubmit() {
    if((this.proScrapForm.controls["grossWeight"].value || this.proScrapForm.controls["prevWeight"].value )==0){
      Swal.fire({
        icon: "error",
        title: "The Quantity cannot be 0.",
      });
      return;
    }
    if (this.proScrapForm.valid) {
      this.grossWeight = this.proScrapForm.controls["grossWeight"].value;
      this.prevGrossWeight = this.proScrapForm.controls["prevWeight"].value;
      this.comments = this.proScrapForm.controls["comments"].value;
      this.department = this.proScrapForm.controls["departments"].value;
      this.lineId = this.proScrapForm.controls["lineId"].value;
      this.ItemKey = this.proScrapForm.controls["ItemKey"].value;
      this.netWeight = this.grossWeight - this.prevGrossWeight - this.selectedContainerValue!;
      const { ...recordScrap } = this.proScrapForm.value;
      recordScrap.qty = parseInt(this.netWeight);
      if (this.netWeight < 0) {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        Swal.fire({
          icon: "error",
          title: "Not enough weight!",
          text: "Weight cannot be less than 0",
        });
      }
      else {
        this.cService.post(this.urls.recordScrap_API_URL, recordScrap).subscribe({
          next: () => {
            setTimeout(() => {
              this.isLoading = false;
            }, 500);            
            this.openPDF();
            // reset form
            this.resetForm();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }

  openPDF() {
    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Crown Poly Scrap Record', 20, 20);
    doc.setFontSize(14);

    doc.text("Production Date", 20, 35);
    doc.text(formatDate(localStorage.getItem('prodDate')!.toString(),'dd-MM-yyyy', 'en'), 73, 35);// from localStorage

    doc.text('Shift', 20, 45);
    doc.text(localStorage.getItem('shift')!.toString(), 73, 45);// from localStorage

    doc.text('Line', 20, 55);
    doc.text(this.lineId, 73, 55);

    doc.text('Scrap Type', 20, 65);
    doc.text(this.ItemKey.toString(), 73, 65);

    doc.text('Gross Weight', 20, 75);
    doc.text(this.grossWeight.toString(), 73, 75);

    doc.text('Previous Gross Weight', 20, 85);
    doc.text(this.prevGrossWeight.toString(), 73, 85);

    doc.text('Container type', 20, 95);
    doc.text(this.containerName.toString(), 73, 95);

    doc.text('Net Weight', 20, 105);
    doc.text(this.netWeight.toString(), 73, 105);

    doc.text('Entered Date', 20, 115);
    doc.text(formatDate(new Date(), 'dd-MM-yyyy', 'en'), 73, 115);

    doc.text('Entered By', 20, 125);
    doc.text(localStorage.getItem("userName")!.toString(), 73, 125); // from localStorage

    doc.text('Comments', 20, 135);
    doc.text(this.comments.toString(), 73, 135);

    doc.getTextDimensions("20");

    doc.save('Crown Poly Scrap Record.pdf');

    this.qr_value = "scrap_" + this.department + "_" + this.ItemKey + "_" + this.netWeight + "_" + formatDate(new Date(), 'dd-MM-yyyy', 'en');
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

  makePdf() {
    this.isLoading = true;
    let doc = new jsPDF();
    doc.html(this.content.nativeElement, {
      callback: (pdf) => {
        pdf.save('Crown Poly Scrap Record - QR.pdf');
        this.isLoading = false;
        Swal.fire({
          icon: "success",
          title: "Scrap recorded successfully.",
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  bindDepartments() {
    this.isLoading = true;
    this.cService.get(this.urls.getDepartments_API_URL).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.departmentData = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  bindLines() {
    this.isLoading = true;
    this.cService.get(this.urls.getLines_API_URL + "/" + this.selectedDep).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.linesData = data;
        this.bindScrapKey();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  bindScrapKey() {
    this.isLoading = true;
    this.cService.get(this.urls.getScrapKey_API_URL + "/" + this.selectedDep).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.scrapKeyData = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  bindContainer() {
    this.isLoading = true;
    this.cService.get(this.urls.getCoreTypes_API_URL + '/' + 'Scrap').subscribe({ // TEST01
      next: (data: { typeDesc: string, weight: number }[]) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.containerData = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  RefreshControls() {
    this.isLoading = true;
    this.resetForm();
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  resetForm() {
    this.formDirective.resetForm();
    this.initializeForm();
  }


}
