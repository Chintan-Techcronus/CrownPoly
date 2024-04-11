import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { proHsRequest, prodnum } from 'src/app/models/proHs/proHs.model';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import { PropnpFrmmainComponent } from '../propnp-frmmain/propnp-frmmain.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LangService } from 'src/app/common/lang.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propnp-frmchange',
  templateUrl: './propnp-frmchange.component.html',
  styleUrls: ['./propnp-frmchange.component.css']
})
export class PropnpFrmchangeComponent implements OnInit {
  isLoading: boolean = false;
  urls = new APIURL();
  prodnamelist: proHsRequest[] = [];
  form: FormGroup;
  selectedWorkOrder: any;
  prodnum: prodnum = {} as prodnum;
  casedata: proHsRequest = {} as proHsRequest;
  requestdata: any = {
    ProdDate: '', // from localstorage
    No_: '', // from localstorage
    shift: '', // from localstorage
    ProdNum: '',
    mLotNo: '',
    ItemNo: '',
    PIN: '',
    ItemNum: '',
  };
  labelTexts = {
    lblSelect: 'Please select a work order',
  };
  buttonTexts = {
    cmdEnter: 'Enter',
  };
  constructor(private cService: CommonService, private fb: FormBuilder, private lang: LangService,
    @Inject(MAT_DIALOG_DATA) private data: any, public dialogRef: MatDialogRef<PropnpFrmmainComponent>) {
    this.form = this.fb.group({
      selectedWorkOrder: ['', Validators.required]
    });
    if (data) {
      this.casedata = data.name; //get linenno from local storage
    }
  }
  ngOnInit(): void {
    this.formLoad();
  }
  formLoad() {
    this.isLoading = true;
    if (this.lang.getLang() !== 0) {
      this.labelTexts.lblSelect = "Por favor selectar production";
      this.buttonTexts.cmdEnter = "Accepta";
    }
    this.cService.post(this.urls.getProPNPOpenProd_API_URL+'/'+this.casedata.lineID).subscribe({
      next: (responseData: any) => {
        this.prodnamelist = responseData;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  }
  onEnterClick() {
    this.isLoading = true;
    if (this.form.valid) {
      this.casedata.prodNum = this.form.value.selectedWorkOrder;
      this.cService.post(this.urls.getProPNPItemKeyAPI_URL+'/'+this.casedata.prodNum).subscribe({
        next: (responseData: any) => {
          this.casedata.itemNo = responseData[0].itemNo.toString();
          if (this.casedata.itemNo != null) {
            this.cService.post(this.urls.getProPNPSetProdNo_API_URL,this.casedata).subscribe({
              next: (responseData: any) => {
                this.casedata = responseData;
                this.dialogRef.close(this.casedata);
              }
            });
          }
          else {
            Swal.fire({
              icon: "error",
              title: "There is no available item for this WorkOrder",
            });
            this.dialogRef.close();
          }
        this.isLoading = false;
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    } 
  }
  onCancelClick() {
    this.dialogRef.close();
  }
}
