import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProhsFrmmainComponent } from '../prohs-frmmain/prohs-frmmain.component';
import { proHsRequest } from 'src/app/models/proHs/proHs.model';
import { CommonService } from 'src/app/services/common.service';
import { APIURL } from 'src/app/services/APIURL';
import { ProhsFrmitemkeyComponent } from '../prohs-frmitemkey/prohs-frmitemkey.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProhsDialogQuantityComponent } from '../prohs-dialog-quantity/prohs-dialog-quantity.component';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prohs-frmconsume',
  templateUrl: './prohs-frmconsume.component.html',
  styleUrls: ['./prohs-frmconsume.component.css']
})
export class ProhsFrmconsumeComponent implements OnInit {
  urls = new APIURL();
  consumeRollsForm!: FormGroup;
  prohsrequest!: proHsRequest;
  submitted = false;
  mItemNo = "";
  validate: boolean = false;
  isLoading = false;
  constructor(public snackBar: MatSnackBar, public dialog: MatDialog, private cService: CommonService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, public dialogRef: MatDialogRef<ProhsFrmmainComponent>) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.consumeRollsForm = this.fb.group({
      lotnumber: ['', [Validators.pattern(/^[^ \t]+$/),Validators.required]],
      qty: ['', Validators.compose([Validators.required, Validators.max(3500)])]
    });
  }
  get f() { return this.consumeRollsForm.controls; }
 onKeyPress(event: KeyboardEvent) {
  const inputElement = event.currentTarget as HTMLInputElement;
  const inputValue = inputElement.value;

  // Allow backspace (charCode 8), digits (charCodes 48-57), and a single dot (charCode 46)
  if (
    (event.charCode !== 8 && event.charCode !== 46) &&
    (event.charCode < 48 || event.charCode > 57 ||
      (event.charCode === 46 && inputValue.includes('.')) ||
      (inputValue.includes('.') && inputValue.split('.')[1].length >= 2)
    )
  ) {
    event.preventDefault();
  }
}
  
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const maxLength = 4;
  
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }
  onConsumeClick() {
    this.isLoading = true;
    this.submitted = true;
    if (this.consumeRollsForm.invalid) {
      return;
    }
    if(this.f.qty.value==0){
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
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
        this.cService.post(this.urls.getCheckLot_API_URL+'/'+mLotNo).subscribe({
          next: (CheckLotData: any) => {
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
           var diff = parseInt(CheckLotData[0].remQty) - numberValue;
            if (diff < 0) {
              const dialogRef = this.dialog.open(ProhsDialogQuantityComponent, {
                width: '500px',
              });
              dialogRef.afterClosed().subscribe((data: any) => {
                if (data !== null && data !== undefined && (Array.isArray(data) ? data.length > 0 : data.trim() !== '')) {
                  var dialogQuentity = data;
                  setTimeout(() => {
                    this.isLoading = false;
                  }, 500);
                }
                else {
                  setTimeout(() => {
                    this.isLoading = false;
                  }, 500);
                  return;
                }
                if (dialogQuentity == 'No') {
                  setTimeout(() => {
                    this.isLoading = false;
                  }, 500);
                  return;
                }
                this.prohsrequest.mLotNo = mLotNo;
                this.prohsrequest.qty = numberValue;
                this.prohsrequest.itemNo = this.mItemNo;
                this.cService.post(this.urls.RecordConsumption_API_URL,this.prohsrequest).subscribe({
                  next: () => {
                    setTimeout(() => {
                      this.isLoading = false;
                    }, 500);
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
              this.prohsrequest.mLotNo = mLotNo;
              this.prohsrequest.qty = numberValue;
              this.prohsrequest.itemNo = this.mItemNo;
              this.cService.post(this.urls.RecordConsumption_API_URL,this.prohsrequest).subscribe({
                next: () => {
                  setTimeout(() => {
                    this.isLoading = false;
                  }, 500);
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
    this.isLoading = true;
    return new Observable<boolean>((observer) => {
      this.prohsrequest = this.data.name;
      this.cService.post(this.urls.prodOrderOpen_API_URL+'/'+this.prohsrequest.prodNum).subscribe({
        next: (responseData: any) => {
          if (Array.isArray(responseData) && responseData.length <= 0) {
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
            Swal.fire({
              icon: "error",
              title: "The production order is no longer open",
            });
            observer.next(false);
            observer.complete();
          }
          else {
            var mLotNo = this.f.lotnumber.value.toString();
            this.cService.post(this.urls.getItemKey2_API_URL+'/'+mLotNo).subscribe({
              next: (responseData: any) => {
                this.mItemNo = '';
                if (Array.isArray(responseData) && responseData.length > 0) {
                  this.mItemNo = responseData[0];
                  this.validate = true;
                  observer.next(true);
                  observer.complete();
                  setTimeout(() => {
                    this.isLoading = false;
                  }, 500);
                } else {
                  const dialogitemkeyRef = this.dialog.open(ProhsFrmitemkeyComponent, {
                    width: '500px',
                    data: { name: this.mItemNo }
                  });
                  dialogitemkeyRef.afterClosed().subscribe((data: any) => {
                    if (Array.isArray(data) && data.length === 0 || data === undefined || data === null) {
                      this.validate = false;
                      observer.next(false);
                      observer.complete();
                      setTimeout(() => {
                        this.isLoading = false;
                      }, 500);
                    } 
                    else {
                      this.validate = true;
                      this.mItemNo=data;
                      observer.next(true);
                      observer.complete();
                      setTimeout(() => {
                        this.isLoading = false;
                      }, 500);
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
