import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBatchCase, caseCount, proHsRequest, prodCases } from 'src/app/models/proHs/proHs.model';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import { PropnpFrmchangeComponent } from '../propnp-frmchange/propnp-frmchange.component';
import { LangService } from 'src/app/common/lang.service';
import { Subscription, interval, map } from 'rxjs';
import { PropnpFrmincidentComponent } from '../propnp-frmincident/propnp-frmincident.component';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-propnp-frmmain',
  templateUrl: './propnp-frmmain.component.html',
  styleUrls: ['./propnp-frmmain.component.css']
})
export class PropnpFrmmainComponent implements OnInit {
  isLoading: boolean = false;
  tmrUpdateSubscription!: Subscription  | undefined;
  btnDisabled = true;
  intStop = 0;
  private intervalTime = 65535;//65535
  timerEnabled: boolean = false;
  count: caseCount = {} as caseCount;
  workordercount = {} as prodCases;
  propnprequest: proHsRequest = {} as proHsRequest;
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
  labelTexts = {
    lblCounts: 'Counts',
    lblCP: 'Case on This Pallet',
    lblCF: 'Cases Finished on Work Order',
    lblCR: 'Cases Reamaining on Work Order',
  };
  buttonTexts = {
    cmdChange: 'Change Work Order',
    cmdEnter: 'Finished Case',
    cmdIncident: 'Incident',
    cmdLogOut: 'LOG OUT',
  };
  constructor(private cService: CommonService, public dialog: MatDialog, private lang: LangService) { }

  ngOnInit(): void {
    this.mainFormLoad();
  }

  mainFormLoad() {
    this.lang.setLang(0); //create language service set this value in the loginside
    if (this.lang.getLang() !== 0) {
      //this.labelTexts.lblCounts = 'Cuentas';
      this.labelTexts.lblCP = 'Cajas en Esta Paleta';
      this.labelTexts.lblCF = 'Cajas Terminada de Production';
      this.labelTexts.lblCR = 'Cajas Remaina de Production';
      this.buttonTexts.cmdChange = 'Cambiar Production';
      this.buttonTexts.cmdEnter = 'Caja Terminada';
      this.buttonTexts.cmdIncident = 'Incidente';
      this.buttonTexts.cmdLogOut = 'Salir';
    }
    this.initializeForm();
    this.getstoptime();
    this.btnDisabled = true;
    this.caseCount(this.casedata);
  }
  initializeForm(): void {
    this.casedata.lineID = localStorage.getItem("lineId")!.toString(); 
    this.casedata.shift=localStorage.getItem("shift")!.toString();
    this.casedata.ProdDate=formatDate(localStorage.getItem("prodDate")!.toString(),'yyyy-MM-dd','en');
  }
  getstoptime() {
    this.cService.get(this.urls.getProPNPStopTime_API_URL).subscribe({
      next: (responseData: any) => {
        this.intStop = responseData;
      }
    });
  }
  caseCount(data: any) {
    this.isLoading = true;
    this.cService.post(this.urls.getProPNPCaseCounts_API_URL,data).subscribe({
      next: (responseData: any) => {
        this.count = responseData
        this.workordercount = this.count.prodCases[0];
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  }
  onChangeWorkOrder(): void {
    const dialogRef = this.dialog.open(PropnpFrmchangeComponent, {
      width: '500px',
      data: { name: this.casedata }
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data != null) {
        this.propnprequest = data;
        this.caseCount(this.propnprequest);
        this.btnDisabled = false;
      }
    });
  }
  cmdUpdateCount() {
    if (this.timerEnabled) {
      this.timerEnabled = true;
      this.tmrUpdateSubscription = interval(this.intervalTime).pipe(
        map(() => {
          if (this.timerEnabled){ // Check if the timer is still enabled
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
  onFinishedCase() {
    this.isLoading = true;
    this.cService.post(this.urls.proPNPprodOrderOpen_API_URL+'/'+this.propnprequest.prodNum).subscribe({
      next: (finishedCase: any) => {
        if (Array.isArray(finishedCase) && finishedCase.length <= 0) {
          Swal.fire({
            icon: "error",
            title: "The production order is no longer open",
          });
          return;
        }
        this.addbatchrequest={
          proddate: this.propnprequest.prodDate,
          lineid : this.propnprequest.lineID,
          shift : this.propnprequest.shift,
          prodorderno : this.propnprequest.prodNum,
          lotno :this.propnprequest.mLotNo
      }
        this.cService.post(this.urls.addProPNPBatchCase_API_URL,this.addbatchrequest).subscribe({
          next: (batchcasedata: any) => {
            this.isLoading = false;
            Swal.fire({
              icon: "success",
              title: "BatchCase data recorded successfully.",
              showConfirmButton: false,
              timer: 2000
            });
            this.caseCount(this.propnprequest);
            if (this.intStop == 0) {
              this.timerEnabled = false;
              this.cmdUpdateCount();
            }
            else {
              this.intervalTime = this.intStop
              this.timerEnabled = true;
              this.cmdUpdateCount();
            }
            this.timerEnabled = true;
            this.cmdUpdateCount();
            this.btnDisabled = true;
            // update the count 
          }
        });
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }
  onIncident(): void {
    const dialogRef = this.dialog.open(PropnpFrmincidentComponent, {
      width: '500px',
      data: { name: this.casedata }
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data != null) {
        Swal.fire({
          icon: "success",
          title: "Incident recorded successfully.",
          showConfirmButton: false,
          timer: 2000
        });
      }
      else {
        dialogRef.close();
      }
    });
  }
}
