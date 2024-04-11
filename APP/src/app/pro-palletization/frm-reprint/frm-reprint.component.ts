import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import { Subscription, interval, map } from 'rxjs';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frm-reprint',
  templateUrl: './frm-reprint.component.html',
  styleUrls: ['./frm-reprint.component.css']
})
export class FrmReprintComponent implements OnInit {

  proFrmReprintForm!: FormGroup;
  isLoading: boolean = false;
  isVisible: boolean = true;
  urls = new APIURL();
  lineNumber!: string;
  itemNumber!: string;
  lotNumber!: string;
  caseCount!: string;
  uniqueNo!: string;
  currentDate!: string;
  qty!: string;
  weight!: string;
  qr_value!: string;
  tmrUpdateSubscription!: Subscription;

  @ViewChild('content') content!: ElementRef;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private cService: CommonService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.qr_value = "qr";
  }

  initializeForm(): void {
    this.proFrmReprintForm = this.fb.group({
      weight: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.proFrmReprintForm.valid) {
      this.isLoading = true;
      this.cService.get(this.urls.printLastPallet_API_URL).subscribe({
        next: (data) => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);         
          if(data.length <= 0){
            Swal.fire({
              icon: "error",
              title: "No data to print!",              
            });
            return;
          } 
          this.weight = this.proFrmReprintForm.controls["weight"].value;
          this.itemNumber = data[0].itemNumber
          this.lineNumber = data[0].lineNumber
          this.lotNumber = data[0].lotNumber
          this.caseCount = data[0].caseCount
          this.uniqueNo = data[0].uniqueNo

          // Print Pallet Data
          this.openPDF();

        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  openPDF() {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Last Production Tag', 20, 20);
    doc.setFontSize(14);

    doc.text("Item No.:", 20, 35);
    doc.text(this.itemNumber.toString(), 70, 35);

    doc.text('Date:', 20, 45);
    doc.text(formatDate(this.currentDate,'dd-MM-yyyy', 'en'), 70, 45);

    doc.text('Line:', 20, 55);
    doc.text(this.lineNumber.toString(), 70, 55);

    doc.text('Weight:', 20, 65);
    doc.text(this.weight.toString(), 70, 65);

    doc.setFontSize(19);

    doc.text('Lot No.:', 20, 75);
    doc.text(this.lotNumber.toString(), 70, 75);

    doc.text('Qty.:', 20, 85);
    doc.text(this.caseCount.toString(), 70, 85);

    doc.setFontSize(14);
    doc.save('Crown Poly Last Production Tag.pdf');

    // 15919C_20721A 1-2_6_24450766
    this.qr_value = this.itemNumber + "_" + this.lotNumber + "-" + this.caseCount + "_" + this.weight + "_" + this.uniqueNo;
    this.tmrUpdateSubscription = interval(1000).pipe(
      map(() => {
        this.makePdf();
      })
    ).subscribe(() => {
      // Unsubscribe to stop the interval
      if (this.tmrUpdateSubscription) {
        this.tmrUpdateSubscription.unsubscribe();
        this.dialog.closeAll();
      }
    });
  }

  makePdf() {
    this.isLoading = true;
    let doc = new jsPDF();
    doc.html(this.content.nativeElement, {
      callback: (pdf) => {
        pdf.save('Crown Poly Last Production Tag - QR.pdf');
        this.isVisible = false;
        this.isLoading = false;
        Swal.fire({
          icon: "success",
          title: "Last production tag reprinted successfully.",
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  onCancel() {
    this.isLoading = false;
  }

}
