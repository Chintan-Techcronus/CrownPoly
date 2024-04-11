import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProtbFrmmainComponent } from '../protb-frmmain/protb-frmmain.component';
import { proHsRequest } from 'src/app/models/proHs/proHs.model';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { APIURL } from 'src/app/services/APIURL';
import { ProtbFrmitemkeyComponent } from '../protb-frmitemkey/protb-frmitemkey.component';
import { ProtbDialogQuantityComponent } from '../protb-dialog-quantity/protb-dialog-quantity.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-protb-frmconsume',
  templateUrl: './protb-frmconsume.component.html',
  styleUrls: ['./protb-frmconsume.component.css']
})
export class ProtbFrmconsumeComponent implements OnInit {
  consumeRollsForm!: FormGroup;
  protbrequest!: proHsRequest;
  submitted = false;
  mItemNo = "";
  validate: boolean = false;
  urls = new APIURL();

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ProtbFrmmainComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    private cService: CommonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.consumeRollsForm = this.fb.group({
      lotnumber: ['', Validators.required],
      qty: ['', Validators.compose([Validators.required,Validators.max(3500)])]
    });
  }
  get f() { return this.consumeRollsForm.controls; }

  

  onConsumeClick() {
    this.submitted = true;
    if (this.consumeRollsForm.invalid) {
      return;
    }
    if(this.f.qty.value==0){
      Swal.fire({
        icon: "error",
        title: "The Quantity cannot be 0.",
      });
      return;
    }
    this.ValidateEntry().subscribe((isValid: boolean) => {
      if (isValid) {
        var mLotNo = this.f.lotnumber.value.toString();
        var numberValue = this.f.qty.value;
        this.cService.post(this.urls.getProTBCheckLot_API_URL+'/'+mLotNo).subscribe({
          next: (CheckLotData: any) => {
            // if (CheckLotData != null) {
            var diff = parseInt(CheckLotData[0].remQty) - numberValue;
            if (diff < 0) {
              const dialogRef = this.dialog.open(ProtbDialogQuantityComponent, {
                width: '500px',
              });
              dialogRef.afterClosed().subscribe((data: any) => {
                if (data !== null && data !== undefined && (Array.isArray(data) ? data.length > 0 : data.trim() !== '')) {
                  var dialogQuentity = data;
                }
                else {
                  return;
                }
                if (dialogQuentity == 'No') {
                  return;
                }
                this.protbrequest.mLotNo = mLotNo;
                this.protbrequest.qty = numberValue;
                this.protbrequest.itemNo = this.mItemNo;
                // create object store localstorage value into that object  +  protbrequest data 
                this.cService.post(this.urls.proTBRecordConsumption_API_URL,this.protbrequest).subscribe({ //pass that object here
                  next: () => {
                    this.dialogRef.close();
                    Swal.fire({
                      icon: "success",
                      title: "Consumption recorded successfully.",
                      showConfirmButton: false,
                      timer: 2000
                    });
                  }
                })
              });
            }
            else {
              this.protbrequest.mLotNo = mLotNo;
              this.protbrequest.qty = numberValue;
              this.protbrequest.itemNo = this.mItemNo;
              this.cService.post(this.urls.proTBRecordConsumption_API_URL,this.protbrequest).subscribe({
                next: () => {
                  this.dialogRef.close();
                  Swal.fire({
                    icon: "success",
                    title: "Consumption recorded successfully.",
                    showConfirmButton: false,
                    timer: 2000
                  });
                }
              })
            }
          }
        });
      }
    });
  }
  ValidateEntry(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.protbrequest = this.data.name;
      this.cService.post(this.urls.proTBprodOrderOpen_API_URL+'/'+this.protbrequest.prodNum).subscribe({
        next: (responseData: any) => {
          if (Array.isArray(responseData) && responseData.length <= 0) {
            Swal.fire({
              icon: "error",
              title: "The production order is no longer open",
            });
            observer.next(false);
            observer.complete();
          }
          else {
            var mLotNo = this.f.lotnumber.value.toString();
            this.cService.post(this.urls.getProTBItemKey2_API_URL+'/'+mLotNo).subscribe({
              next: (responseData: any) => {
                this.mItemNo = '';
                if (Array.isArray(responseData) && responseData.length > 0) {
                  this.mItemNo = responseData[0];
                  this.validate = true;
                  observer.next(true);
                  observer.complete();
                }
                else {
                  const dialogRef = this.dialog.open(ProtbFrmitemkeyComponent, {
                    width: '500px',
                    data: { name: this.mItemNo }
                  });
                  dialogRef.afterClosed().subscribe((data: any) => {
                    if (Array.isArray(data) && data.length === 0 || data === undefined || data === null) {
                      observer.next(false);
                      observer.complete();
                    }
                    else {
                      observer.next(true);
                      observer.complete();
                    }
                  });
                }
              }
            });
          }
        }
      });
    });
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
