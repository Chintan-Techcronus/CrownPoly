import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { proHsRequest, prodnum } from 'src/app/models/proHs/proHs.model';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import { ProstripcutFrmitemkeyComponent } from '../prostripcut-frmitemkey/prostripcut-frmitemkey.component';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ProstripcutDialogQuantityComponent } from '../prostripcut-dialog-quantity/prostripcut-dialog-quantity.component';
import { RecordProduction } from 'src/app/models/prostripcut/prostripcut';


@Component({
  selector: 'app-prostripcut-frmmain',
  templateUrl: './prostripcut-frmmain.component.html',
  styleUrls: ['./prostripcut-frmmain.component.css']
})
export class ProstripcutFrmmainComponent implements OnInit {
  urls = new APIURL();
  form!: FormGroup;
  recordprod: RecordProduction = {} as RecordProduction;
  prodnamelist: proHsRequest[] = [];
  prodnum: prodnum = {} as prodnum;
  prostripcut: proHsRequest = {} as proHsRequest;
  changedvalue = []
  values: { [label: string]: number } = {};
  mItemNo = '';
  mProdNo = '';
  mLotNo = '';
  sum = 0;
  isLoading: boolean = false;
  labelname = [
    ['A', 'F', 'K', 'P', 'U'],
    ['B', 'G', 'L', 'Q', 'V'],
    ['C', 'H', 'M', 'R', 'W'],
    ['D', 'I', 'N', 'S', 'X'],
    ['E', 'J', 'O', 'T', 'Y']
  ]
  label2name = [
    ['AA', 'FF', 'KK', 'PP', 'UU'],
    ['BB', 'GG', 'LL', 'QQ', 'VV'],
    ['CC', 'HH', 'MM', 'RR', 'WW'],
    ['DD', 'II', 'NN', 'SS', 'XX'],
    ['EE', 'JJ', 'OO', 'TT', 'YY']
  ]
  localdata = {
    ProdDate: '', // from localstorage
    lineID: '', // from localstorage
    shift: '', // from localstorage
    ProdNum: '',
    mLotNo: '',
    ItemNo: '',
    ItemNum: '',
  }
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective; //to reset form

  constructor(private fb: FormBuilder, private cService: CommonService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.formLoad()
  }

  initializeForm() {
    this.localdata.lineID = localStorage.getItem("lineId")!.toString();
    this.localdata.shift = localStorage.getItem("shift")!.toString();
    this.localdata.ProdDate = localStorage.getItem("prodDate")!.toString();
    this.form = this.fb.group({
      selectedWorkOrder: ['', [Validators.required]],
      lotnumber: ['', [Validators.pattern(/^[^ \t]+$/), Validators.required]],
      qty: [null, Validators.required],
      weightquantity: [0]
    });
  }

  formLoad() {
    this.LoadWorkOrders()
  }

  LoadWorkOrders() {
    this.cService.post(this.urls.getProstripcutGetOpenProd_API_URL + '/' + this.localdata.lineID).subscribe({
      next: (responseData: any) => {
        this.prodnamelist = responseData;
      }
    });
  }

  onRecordProClick() {
    this.isLoading = true;
    this.ValidateEntry().subscribe((isValid: boolean) => {
      if (isValid) {
        this.mLotNo = this.form.get('lotnumber')?.value;
        var numberValue = this.form.get('qty')?.value;
        this.cService.post(this.urls.getProstripcutCheckLot_API_URL + '/' + this.mLotNo).subscribe({
          next: (CheckLotData: any) => {
            var diff = parseInt(CheckLotData[0].remQty) - numberValue;
            if (diff < 0) {
              const dialogRef = this.dialog.open(ProstripcutDialogQuantityComponent, {
                width: '500px',
              });
              dialogRef.afterClosed().subscribe({
                next: (recordData: any) => {
                  if (recordData !== null && recordData !== undefined && (Array.isArray(recordData) ? recordData.length > 0 : recordData.trim() !== '')) {
                    var dialogQuentity = recordData;
                  }
                  else {
                    return;
                  }
                  if (dialogQuentity == 'No') {
                    return;
                  }
                  else {
                    this.RecordProduction();
                    this.isLoading = false;
                  }
                },
              });
            }
            else {
              this.RecordProduction();
              this.isLoading = false;
            }
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
          }
        });
      }
    })
  }

  RecordProduction() {
    this.isLoading = true;
    this.localdata.ProdDate;
    this.localdata.shift;
    this.localdata.lineID;
    this.localdata.ProdNum = this.mProdNo;
    this.localdata.mLotNo = this.mLotNo;
    this.localdata.ItemNo = this.mItemNo.toString();
    this.cService.post(this.urls.prostripcutRecordConsumption_API_URL, this.localdata).subscribe({
      next: (recordData: any) => {
      },
    });
    if (Object.keys(this.values).length === 0) {
      Swal.fire({
        icon: "success",
        title: "Consumption recorded successfully.",
        showConfirmButton: false,
        timer: 2000
      });
      this.isLoading = false;
      return;
    } else {
      for (const key in this.values) {
        if (this.values.hasOwnProperty(key)) {
          const value = this.values[key];
          this.recordprod = {
            prodDate: this.localdata.ProdDate,
            shift: this.localdata.shift,
            lineId: this.localdata.lineID,
            prodNum: this.mProdNo,
            qty: value,
            lotNumber: this.mLotNo + key,
          }
          this.cService.post(this.urls.prostripcutRecordProduction_API_URL, this.recordprod).subscribe({
            next: (recordData: any) => {
            },
          });
        }
      }
      Swal.fire({
        icon: "success",
        title: "Production data recorded successfully.",
        showConfirmButton: false,
        timer: 2000
      });
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
    this.onReload();
  }

  weight(event: any, label: string, i: number) {
    const changedValue = event.target.value;
    this.values[label] = parseInt(changedValue);
    this.sum = Object.values((this.values))?.reduce((acc, value) => acc + (value ?? 0), 0) ?? 0;
  }

  ValidateEntry(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (this.form.get('qty')?.value == 0) {
        Swal.fire({
          icon: "error",
          title: "The Quantity cannot be 0.",
        });
        return;
      }
      if (this.form.valid) {
        this.mProdNo = this.form.get('selectedWorkOrder')?.value;
        const qty = this.form.get('qty')?.value;
        if (this.sum > qty) {
          Swal.fire({
            icon: "error",
            title: "You are magically making more than what you are using",
          });
          observer.next(false);
          observer.complete();
          return;
        }
        this.cService.post(this.urls.prodOrderOpen_API_URL + '/' + this.mProdNo).subscribe({
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
              this.mLotNo = this.form.get('lotnumber')?.value;
              this.cService.post(this.urls.getItemKey2_API_URL + '/' + this.mLotNo).subscribe({
                next: (responseData: any) => {
                  this.mItemNo = '';
                  if (Array.isArray(responseData) && responseData.length > 0) {
                    this.mItemNo = responseData[0];
                    observer.next(true);
                    observer.complete();
                  }
                  else {
                    const dialogRef = this.dialog.open(ProstripcutFrmitemkeyComponent, {
                      width: '500px',
                      data: { name: this.mItemNo }
                    });
                    dialogRef.afterClosed().subscribe((data: any) => {
                      if (data == "cancel") {
                        observer.next(false);
                        observer.complete();
                      }
                      else {
                        if (Array.isArray(data) && data.length === 0 || data === undefined || data === null) {
                          observer.next(false);
                          observer.complete();
                        } else {
                          observer.next(true);
                          observer.complete();
                        }
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    });
  }

  onReload() {
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

