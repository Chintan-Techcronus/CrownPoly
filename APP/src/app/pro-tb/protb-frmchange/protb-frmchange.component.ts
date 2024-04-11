import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { proHsRequest } from 'src/app/models/proHs/proHs.model';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProtbFrmmainComponent } from '../protb-frmmain/protb-frmmain.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-protb-frmchange',
  templateUrl: './protb-frmchange.component.html',
  styleUrls: ['./protb-frmchange.component.css']
})
export class ProtbFrmchangeComponent implements OnInit {
  urls = new APIURL();
  prodnamelist: proHsRequest[] = [];
  form: FormGroup;
  protbdata: proHsRequest = {} as proHsRequest;
  isLoading: any;
  constructor(private cService: CommonService, private fb: FormBuilder, 
    public dialogRef: MatDialogRef<ProtbFrmmainComponent>,@Inject(MAT_DIALOG_DATA) private data: any) {
    this.form = this.fb.group({
      selectedWorkOrder: ['', Validators.required]
    });
      if (data){
        this.protbdata=data.name; //get linenno from local storage
      }
  }
  ngOnInit(): void {
    this.formLoad()
  }
  formLoad() {
    this.isLoading = true;
    this.cService.post(this.urls.getProTBOpenProd_API_URL+'/' +this.protbdata.lineID).subscribe({
      next: (responseData: any) => {
        this.prodnamelist = responseData;
      }
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
  onEnterClick() {
    this.isLoading = true;
    if (this.form.valid) {
      this.protbdata.prodNum = this.form.value.selectedWorkOrder;
      this.cService.post(this.urls.productItemKey_API_URL+'/'+this.protbdata.prodNum).subscribe({
        next: (responseData: any) => {
          this.protbdata.itemNo = responseData[0].itemNo.toString();
          if (this.protbdata.itemNo != null) {
            this.cService.post(this.urls.getProTBSetProdNo_API_URL,this.protbdata).subscribe({
              next: (responseData: any) => {
                this.protbdata = responseData;
                this.dialogRef.close(this.protbdata);
              }
            });
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
          }
          else {
            Swal.fire({
              icon: "error",
              title: "There is no available item for this WorkOrder",
            });
            this.dialogRef.close();
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
          }
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
    this.isLoading = false;
   }
}
