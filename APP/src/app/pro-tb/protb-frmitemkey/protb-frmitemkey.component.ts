import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { proHsRequest } from 'src/app/models/proHs/proHs.model';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import { ProtbFrmconsumeComponent } from '../protb-frmconsume/protb-frmconsume.component';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-protb-frmitemkey',
  templateUrl: './protb-frmitemkey.component.html',
  styleUrls: ['./protb-frmitemkey.component.css']
})
export class ProtbFrmitemkeyComponent implements OnInit {
  urls = new APIURL();
  itemkeyForm!: FormGroup;
  prohsrequest!: proHsRequest;
  submitted = false;
  
  constructor(private fb : FormBuilder,private cService : CommonService ,public dialogRef: MatDialogRef<ProtbFrmconsumeComponent>) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.itemkeyForm = this.fb.group({
      itemno: ['',[Validators.pattern(/^[^ \t]+$/),Validators.required]],
    });
  }
  get f() { return this.itemkeyForm.controls; }
  onSubmitClick() {
    this.submitted = true;
    if (this.itemkeyForm.invalid) {
      return;
    }
    var itemno = this.f.itemno.value.toString();
    this.cService.post(this.urls.getProTBItemDetails_API_URL+'/'+itemno).subscribe({
      next: (responseData: any) => {
        if (responseData== null || Array.isArray(responseData) && responseData.length <= 0) {
          Swal.fire({
            icon: "error",
            title: "Itemkey specified does not exist",
          });
        }
        else {
          this.dialogRef.close(responseData);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
  onCancelClick() {
    this.dialogRef.close();
  }
}
