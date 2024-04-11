import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProtbFrmmainComponent } from '../protb-frmmain/protb-frmmain.component';

@Component({
  selector: 'app-protb-dialog-quantity',
  templateUrl: './protb-dialog-quantity.component.html',
  styleUrls: ['./protb-dialog-quantity.component.css']
})
export class ProtbDialogQuantityComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProtbFrmmainComponent>) { }
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
