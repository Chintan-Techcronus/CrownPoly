import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, interval, map } from 'rxjs';
import { AddBatchCase, caseCount, proHsRequest, prodCases } from 'src/app/models/proHs/proHs.model';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { ProtbFrmchangeComponent } from '../protb-frmchange/protb-frmchange.component';
import { ProtbFrmconsumeComponent } from '../protb-frmconsume/protb-frmconsume.component';

@Component({
  selector: 'app-protb-frmmain',
  templateUrl: './protb-frmmain.component.html',
  styleUrls: ['./protb-frmmain.component.css']
})
export class ProtbFrmmainComponent implements OnInit {
  btnDisabled = true;
  protbrequest: proHsRequest = {} as proHsRequest
  addbatchrequest: AddBatchCase = {} as AddBatchCase;
  count: caseCount = {} as caseCount;
  workordercount = {} as prodCases;
  Tbdata: any = {
    ProdDate: '', // from localstorage
    lineID: '', // from localstorage
    shift: '', // from localstorage
    ProdNum: '',
    mLotNo: '',
    ItemNo: '',
    ItemNum: '',
  };
  urls = new APIURL();
  tmrUpdateSubscription!: Subscription | undefined;
  private intervalTime = 65535;//65535
  timerEnabled: boolean = false;
  isLoading: any;

  constructor(private cService: CommonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
    this.mainFormLoad();
  }
  initializeForm(): void {
    this.Tbdata.lineID = localStorage.getItem("lineId")!.toString(); 
    this.Tbdata.shift=localStorage.getItem("shift")!.toString();
    this.Tbdata.ProdDate=formatDate(localStorage.getItem("prodDate")!.toString(),'yyyy-MM-dd','en');
  }
  mainFormLoad() {
    this.caseCount(this.Tbdata);
  }
  caseCount(data: any) {
    this.isLoading = true;
    this.cService.post(this.urls.getProTBCaseCounts_API_URL,data).subscribe({
      next: (responseData: any) => {
        this.count = responseData
        this.workordercount = this.count.prodCases[0];
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  }
  onChangeWorkOrder(data: any) {
    const dialogRef = this.dialog.open(ProtbFrmchangeComponent, {
      width: '500px',
      data: { name: this.Tbdata }
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data != null|| data !=undefined) {
        this.protbrequest = data;
        this.caseCount(this.protbrequest);
        this.btnDisabled = false;
      }
      else{
        return;
      }
    });
  }
  onFinishedCase(data: any) {
    this.isLoading = true;
    this.cService.post(this.urls.proTBprodOrderOpen_API_URL+'/'+this.protbrequest.prodNum).subscribe({
      next: (finishedCase: any) => {
        if (Array.isArray(finishedCase) && finishedCase.length <= 0) {
          Swal.fire({
            icon: "error",
            title: "The production order is no longer open",
          });
          return;
        }
        this.addbatchrequest={
          proddate: this.protbrequest.prodDate,
          lineid : this.protbrequest.lineID,
          shift : this.protbrequest.shift,
          prodorderno : this.protbrequest.prodNum,
          lotno :this.protbrequest.mLotNo
      }
        // create object store localstorage value into that object  +  protbrequest data 
        this.cService.post(this.urls.addProTBBatchCase_API_URL,this.addbatchrequest).subscribe({ //pass that object here
          next: () => {
            Swal.fire({
              icon: "success",
              title: "BatchCase data recorded successfully.",
              showConfirmButton: false,
              timer: 2000
            });
            this.caseCount(this.protbrequest);
            this.timerEnabled = true;
            this.cmdUpdateCount(); // update the count 
          }
        });
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }
  cmdUpdateCount() {
    if (this.timerEnabled) {
      this.timerEnabled = true;
      this.tmrUpdateSubscription = interval(this.intervalTime).pipe(
        map(() => {
          if (this.timerEnabled){ // Check if the timer is still enabled
          this.caseCount(this.Tbdata);
          }
        })
      ).subscribe(() => {
        this.timerEnabled = false; //stop timer
        if (!this.timerEnabled) {
          // Unsubscribe to stop the interval
          if (this.tmrUpdateSubscription) {
            this.tmrUpdateSubscription.unsubscribe();
          }
        }
      });
    }
  }
  onConsumeRolls(): void {
    const dialogRef = this.dialog.open(ProtbFrmconsumeComponent, {
      width: '500px',
      data: { name: this.Tbdata }
    });
  }
  ngOnDestroy() {
    if (this.tmrUpdateSubscription) {
      this.tmrUpdateSubscription.unsubscribe();
    }
  }
}

