import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { ProhsFrmmainComponent } from '../prohs-frmmain/prohs-frmmain.component'

@Component({
  selector: 'app-prohs-dialog-quantity',
  templateUrl: './prohs-dialog-quantity.component.html',
  styleUrls: ['./prohs-dialog-quantity.component.css']
})
export class ProhsDialogQuantityComponent implements OnInit {
  isLoading = false;
  constructor(public dialogRef: MatDialogRef<ProhsFrmmainComponent> ) { }
  ngOnInit(): void {
  }
  onYes(){
    this.isLoading = true;
    var data = 'Yes';
    this.dialogRef.close(data);
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
  onCancle(){
    this.isLoading = true;
    var data = 'No';
    this.dialogRef.close(data);
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
