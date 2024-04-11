import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ProhsFrmchangeComponent } from '../prohs-frmchange/prohs-frmchange.component';
import { ProhsFrmconsumeComponent } from '../prohs-frmconsume/prohs-frmconsume.component';
import { APIURL } from 'src/app/services/APIURL';
import { AddBatchCase, caseCount, proHsRequest, prodCases } from 'src/app/models/proHs/proHs.model';
import { CommonService } from 'src/app/services/common.service';
import { Subscription, interval, map } from 'rxjs';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-prohs-frmmain',
  templateUrl: './prohs-frmmain.component.html',
  styleUrls: ['./prohs-frmmain.component.css']
})
export class ProhsFrmmainComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  tmrUpdateSubscription!: Subscription | undefined;
  private intervalTime = 65535;
  timerEnabled: boolean = false;
  btnDisabled = true;
  count: caseCount = {} as caseCount;
  workordercount = {} as prodCases;
  prohsrequest: proHsRequest = {} as proHsRequest;
  addbatchrequest: AddBatchCase = {} as AddBatchCase;
  casedata: any = {
    ProdDate: '', // from localstorage
    lineID: '', // from localstorage
    shift: '', // from localstorage
    ProdNum: '',
    mLotNo: '',
    ItemNo: '',
    ItemNum: '',
  };  
  urls = new APIURL();
  constructor(public dialog: MatDialog, private cService: CommonService) {}
  ngOnInit(): void {
    this.mainFormLoad();
    this.cmdUpdateCount();
  }
  mainFormLoad() {
    this.initializeForm();
    this.caseCount(this.casedata);
  }
  initializeForm(): void {
    this.casedata.lineID = localStorage.getItem("lineId")!.toString(); 
    this.casedata.shift=localStorage.getItem("shift")!.toString();
    this.casedata.ProdDate=formatDate(localStorage.getItem("prodDate")!.toString(),'yyyy-MM-dd','en');
  }
    caseCount(data: any) {
    this.isLoading = true;
    this.cService.post(this.urls.caseCount_API_URL,data).subscribe({
      next: (responseData: any) => {
        this.count = responseData
        this.workordercount = this.count.prodCases[0];
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  }
  onChangeWorkOrder(data: any): void {
    const dialogRef = this.dialog.open(ProhsFrmchangeComponent, {
      width: '500px',
      data: { name: this.casedata }
    });
    dialogRef.afterClosed().subscribe((data:any) => {
      if (data != null || data !=undefined) {
        this.prohsrequest = data;
        this.caseCount(this.prohsrequest);
        this.btnDisabled = false;
      }
      else{
        return;
      }
    });
  }
  cmdUpdateCount() {
    if (this.timerEnabled) {
      this.timerEnabled = true;
      this.tmrUpdateSubscription = interval(this.intervalTime).pipe(
        map(() => {
          if (this.timerEnabled) { // Check if the timer is still enabled
            this.caseCount(this.casedata);
          }
        })
      ).subscribe(() => {
        this.timerEnabled = false;   // stop timer
        if (!this.timerEnabled) {
          // Unsubscribe to stop the interval
          if (this.tmrUpdateSubscription) {
            this.tmrUpdateSubscription.unsubscribe();
          }
        }
      });
    }
  }
  onFinishedCase(data: any) {
    this.isLoading = true;
    this.cService.post(this.urls.prodOrderOpen_API_URL+'/'+this.prohsrequest.prodNum).subscribe({
      next: (finishedCase: any) => {
        if (Array.isArray(finishedCase) && finishedCase.length <= 0) {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          Swal.fire({
            icon: "error",
            title: "The production order is no longer open",
          });
          return;
        }
        
        this.addbatchrequest={
            proddate: this.prohsrequest.prodDate,
            lineid : this.prohsrequest.lineID,
            shift : this.prohsrequest.shift,
            prodorderno : this.prohsrequest.prodNum,
            lotno :this.prohsrequest.mLotNo
        }
        this.cService.post(this.urls.addBatchCase_API_URL,this.addbatchrequest).subscribe({
          next: (batchcasedata: any) => {
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
            Swal.fire({
              icon: "success",
              title: "BatchCase data recorded successfully.",
              showConfirmButton: false,
              timer: 2000
            });
            this.caseCount(this.prohsrequest);
            this.timerEnabled = true;
            this.cmdUpdateCount(); // update the count 
          }
        });
      },
      error: (error) => {
        console.error('Error:', error);
      }
    }); 
  }
  onConsumeRolls(): void {
    const dialogRef = this.dialog.open(ProhsFrmconsumeComponent, {
      width: '500px',
      data: { name: this.casedata }
    });
  }
  ngOnDestroy() {
    if (this.tmrUpdateSubscription) {
      this.tmrUpdateSubscription.unsubscribe();
    }
  }
}
