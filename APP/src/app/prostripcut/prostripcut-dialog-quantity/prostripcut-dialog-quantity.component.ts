import { Component, OnInit } from '@angular/core';
import { ProstripcutFrmmainComponent } from '../prostripcut-frmmain/prostripcut-frmmain.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prostripcut-dialog-quantity',
  templateUrl: './prostripcut-dialog-quantity.component.html',
  styleUrls: ['./prostripcut-dialog-quantity.component.css']
})
export class ProstripcutDialogQuantityComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProstripcutFrmmainComponent>) { }

  ngOnInit(): void {
  }
  onYes(){
    var data = 'Yes';
    this.dialogRef.close(data);
  }
  onCancle(){
    var data = 'No';
    this.dialogRef.close(data);
  }
}
