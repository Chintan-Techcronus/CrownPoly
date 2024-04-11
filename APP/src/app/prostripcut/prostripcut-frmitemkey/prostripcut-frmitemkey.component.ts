import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APIURL } from 'src/app/services/APIURL';
import { ProstripcutFrmmainComponent } from '../prostripcut-frmmain/prostripcut-frmmain.component';

@Component({
  selector: 'app-prostripcut-frmitemkey',
  templateUrl: './prostripcut-frmitemkey.component.html',
  styleUrls: ['./prostripcut-frmitemkey.component.css']
})
export class ProstripcutFrmitemkeyComponent implements OnInit {
  urls = new APIURL();
  itemkeyForm!: FormGroup;
  submitted = false;
  isLoading: any;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ProstripcutFrmmainComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.itemkeyForm = this.fb.group({
      itemno: ['',[ Validators.required]],
    });
  }
  get f() { return this.itemkeyForm.controls; }
  onSubmitClick() {
    this.isLoading = true;
    this.submitted = true;
    if (this.itemkeyForm.invalid) {
      return;
    }
    else {
      var itemno = this.f.itemno.value.toString();
      this.dialogRef.close(itemno);
    }
    this.isLoading = false;
  }
  onCancelClick() {
    this.dialogRef.close('cancel');
    this.isLoading = false;
  }
}
