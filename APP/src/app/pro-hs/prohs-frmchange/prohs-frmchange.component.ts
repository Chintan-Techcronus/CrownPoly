import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProhsFrmmainComponent } from '../prohs-frmmain/prohs-frmmain.component';
import { CommonService } from 'src/app/services/common.service';
import { APIURL } from 'src/app/services/APIURL';
import {  proHsRequest,prodnum } from 'src/app/models/proHs/proHs.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-prohs-frmchange',
  templateUrl: './prohs-frmchange.component.html',
  styleUrls: ['./prohs-frmchange.component.css']
})
export class ProhsFrmchangeComponent implements OnInit {
  urls = new APIURL();
  prodnamelist : proHsRequest[] =[];
  form: FormGroup;
  selectedWorkOrder: any;
  prodnum :prodnum= {} as prodnum;
  casedata :proHsRequest= {} as proHsRequest;
  isLoading = false;
  constructor(private cService: CommonService, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ProhsFrmmainComponent>
  ) { 
      this.form = this.fb.group({
        selectedWorkOrder: ['', Validators.required]
      });
        if (data){
          this.casedata = data.name; //get linenno from local storage
        }
  }
  ngOnInit(): void {
    this.formLoad();
  }
  formLoad(){
    this.isLoading = true;
    this.cService.post(this.urls.productionOrder_API_URL+'/'+this.casedata.lineID).subscribe({ 
      next:(responseData: any) =>{
        this.prodnamelist = responseData;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  }
  onEnterClick(){
    this.isLoading = true;
    if (this.form.valid) {
      this.casedata.prodNum = this.form.value.selectedWorkOrder;
      this.cService.post(this.urls.productItemKey_API_URL+'/'+this.casedata.prodNum).subscribe({ 
        next:(responseData: any) =>{
          this.casedata.itemNo = responseData[0].itemNo.toString();
          if (this.casedata.itemNo!=null){
            this.cService.post(this.urls.setProdNo_API_URL,this.casedata).subscribe({ 
              next:(responseData: any) =>{
                this.casedata = responseData;
                setTimeout(() => {
                  this.isLoading = false;
                }, 500);
                this.dialogRef.close(this.casedata);
              }
            });
          }
          else{
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
            Swal.fire({
              icon: "error",
              title: "There is no available item for this WorkOrder",
            });
            this.dialogRef.close();
          }
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    } 
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
