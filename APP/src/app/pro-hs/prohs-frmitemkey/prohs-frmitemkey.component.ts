import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIURL } from 'src/app/services/APIURL';
import { proHsRequest } from 'src/app/models/proHs/proHs.model';
import { ProhsFrmconsumeComponent } from '../prohs-frmconsume/prohs-frmconsume.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prohs-frmitemkey',
  templateUrl: './prohs-frmitemkey.component.html',
  styleUrls: ['./prohs-frmitemkey.component.css']
})
export class ProhsFrmitemkeyComponent implements OnInit {
  urls = new APIURL();
  itemkeyForm!: FormGroup;
  prohsrequest!: proHsRequest;
  submitted = false;
  isLoading = false;
  constructor(private cService: CommonService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, public dialogRef: MatDialogRef<ProhsFrmconsumeComponent>) { }
 
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.itemkeyForm = this.fb.group({
      itemno: ['',[Validators.pattern(/^[^ \t]+$/) ,Validators.required]],
    });
  }
  get f() { return this.itemkeyForm.controls; }
  onSubmitClick() {
    this.isLoading = true;
    this.submitted = true;
    if (this.itemkeyForm.invalid) {
        this.isLoading = false;
      return;
    }
    var itemno = this.f.itemno.value.toString();
    this.cService.post(this.urls.getItemDetails_API_URL+'/'+itemno).subscribe({
      next: (responseData: any) => {
        if ( responseData== null || Array.isArray(responseData) && responseData.length <= 0) {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          Swal.fire({
            icon: "error",
            title: "Itemkey specified does not exist",
          });
        }
        else {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
            this.dialogRef.close(itemno);
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
