import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import { Subscription, interval, map } from 'rxjs';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frm-pallet',
  templateUrl: './frm-pallet.component.html',
  styleUrls: ['./frm-pallet.component.css']
})
export class FrmPalletComponent implements OnInit {
  currentDate!: string;
  tmrUpdateSubscription!: Subscription;
  proFrmPalletForm!: FormGroup;
  urls = new APIURL();
  lineData: any[] = [];
  itemData: any[] = [];
  selectedLine!: string;
  selectedItem!: string;
  isLoading: boolean = false;
  isVisible: boolean = true;
  palletSize!: string;
  qty!: string;
  weight!: string;
  qr_value!: string;

  // To store pallet data for print
  lineNumber!: string;
  itemNumber!: string;
  lotNumber!: string;
  caseCount!: string;
  uniqueNo!: string;

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective; //to reset form
  @ViewChild("dialogRef") dialogRef!: TemplateRef<any>;
  @ViewChild('content') content!: ElementRef;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private cService: CommonService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getLineNo();
    this.qr_value = "qr";
  }

  initializeForm(): void {
    this.proFrmPalletForm = this.fb.group({
      lineId: ['', Validators.required],
      itemKey: ['', Validators.required],
      qty: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.proFrmPalletForm.valid) {
      this.checkQuantity();
    }
  }

  checkQuantity() {
    this.isLoading = true;
    this.qty = this.proFrmPalletForm.controls["qty"].value;
    this.weight = this.proFrmPalletForm.controls["weight"].value;
    if (this.qty == this.palletSize) {
      this.CheckQuantityCommon();
    }
    else {
      const dialogRef = this.dialog.open(this.dialogRef);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.isLoading = false;
          this.CheckQuantityCommon();
        }
        else{
          this.isLoading = false;
        }
      });
    }
  }

  CheckQuantityCommon() {
    this.isLoading = true;
    const { ...palletCaseCount } = this.proFrmPalletForm.value;
    palletCaseCount.lineId = palletCaseCount.lineId.toString();
    palletCaseCount.qty = palletCaseCount.qty.toString();
    palletCaseCount.weight = palletCaseCount.weight.toString();
    this.cService.post(this.urls.getPalletCaseCount_API_URL, palletCaseCount).subscribe({
      next: (caseCountQtyTotal) => {
        this.isLoading = false;
        this.checkEnoughCases(caseCountQtyTotal);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  checkEnoughCases(caseCountQtyTotal: any) {
    if (this.qty > caseCountQtyTotal) {
      this.isLoading = false;
      Swal.fire({
        icon: "error",
        title: "Not enought cases!",
        text: "There are not enough cases on this line for the quantity selected.",
      });
      return;
    }
    else {
      this.isLoading = true;
      // set pallet data
      const { ...setPalletData } = this.proFrmPalletForm.value;
      setPalletData.lineId = setPalletData.lineId.toString();
      setPalletData.qty = setPalletData.qty.toString();
      setPalletData.weight = setPalletData.weight.toString();
      this.cService.post(this.urls.setPallet_API_URL, setPalletData).subscribe({
        next: () => {         
          // get last pallet data for print 
          this.isLoading = false;
          this.storeLastPalletDataForPrint();
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      });
    }
  }

  storeLastPalletDataForPrint() { 
    this.isLoading = true;
    this.cService.get(this.urls.printLastPallet_API_URL).subscribe({
      next: (data) => {
        if (data.length != 0)
        {
          this.lineNumber = data[0].lineNumber
          this.itemNumber = data[0].itemNumber
          this.lotNumber = data[0].lotNumber
          this.caseCount = data[0].caseCount
          this.uniqueNo = data[0].uniqueNo
        // Print Pallet Data
        this.isLoading = false;
        this.openPDF(); 
        }
        else
        {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          Swal.fire({
            icon: "error",
            title: "Can not generate a pdf",
            showConfirmButton: false,
            timer: 4000
          });
          this.dialog.closeAll();
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  openPDF() {
    this.isLoading = true;
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Crown Poly Production Tag', 20, 20);
    doc.setFontSize(14);

    doc.text("Item No.:", 20, 35);
    doc.text(this.itemNumber.toString(), 70, 35);

    doc.text('Date:', 20, 45);
    doc.text(this.currentDate, 70, 45);

    doc.text('Line:', 20, 55);
    doc.text(this.lineNumber.toString(), 70, 55);

    doc.text('Weight:', 20, 65);
    doc.text(this.weight.toString(), 70, 65);

    doc.setFontSize(19);

    doc.text('Lot No.:', 20, 75);
    doc.text(this.lotNumber.toString(), 70, 75);

    doc.text('Qty.:', 20, 85);
    doc.text(this.qty.toString(), 70, 85);

    doc.setFontSize(14);
    doc.save('Crown Poly Production Tag.pdf');

    this.qr_value = this.itemNumber + "_" + this.lotNumber + "-" + this.caseCount + "_" + this.weight + "_" + this.uniqueNo;
    this.tmrUpdateSubscription = interval(1000).pipe(
      map(() => {
        this.isLoading = false;
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
        pdf.save('Crown Poly Production Tag - QR.pdf');
        this.isVisible = false;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        Swal.fire({
          icon: "success",
          title: "Pallet data added successfully.",
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  getLineNo() {
    this.isLoading = true;
    this.cService.postWithoutModel(this.urls.getLineNo_API_URL).subscribe({
      next: (data) => {
        this.lineData = data;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  getItem() {
    this.isLoading = true;
    this.cService.get(this.urls.getItem_API_URL + "/" + this.selectedLine).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.itemData = data;
        var itemKeyControl = this.proFrmPalletForm.get('itemKey');
        itemKeyControl?.setValue("");
        var qtyControl = this.proFrmPalletForm.get('qty');
        qtyControl?.setValue("");
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  getPalletSize() {
    this.isLoading = true;
    this.cService.get(this.urls.getPalletSize_API_URL + "/" + this.selectedItem).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.palletSize = data.caseCount;
        // assign to qty
        this.proFrmPalletForm.patchValue({
          qty: data.caseCount,
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  resetForm() {
    this.formDirective.resetForm();
    this.initializeForm();
  }
}
