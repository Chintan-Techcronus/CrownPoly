import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { ProductionLines } from 'src/app/common/prod-lines.enum';
import { Prodlinelist } from 'src/app/common/prodlines-list.enum';

@Component({
  selector: 'app-shift-line',
  templateUrl: './shift-line.component.html',
  styleUrls: ['./shift-line.component.css']
})
export class ShiftLineComponent implements OnInit {

  isLoading: any;
  shiftLineForm: any;
  lineData: any;
  urls = new APIURL();
  shiftDate!: string;
  title!: string;
  isProScrap: boolean = true;
  newtitle!: string;
  
  constructor(private fb: FormBuilder, private cService: CommonService, private router: Router, public dialogRef: MatDialogRef<ShiftLineComponent>, @Inject(MAT_DIALOG_DATA) public data: { productionLine: string, title: string }) { }

  ngOnInit(): void {
    this.title = this.data.title;
    // this.newtitle = Prodlinelist[this.title as keyof typeof Prodlinelist];
    if (this.title == ProductionLines.ProScrap) {
      this.isProScrap = false;
    }
    this.initializeForm();
    this.bindLines(this.data.productionLine);
  }


  initializeForm() {
    const currentDate = new Date();
    this.shiftLineForm = this.fb.group({
      lineId: [''],
      shift: ['', Validators.required],
      shiftDate: [currentDate, Validators.required]
    });
  }


  bindLines(productionLine: string) {
    this.isLoading = true;
    this.cService.get(this.urls.getOpenLines_API_URL + "/" + productionLine).subscribe({
      next: (data) => {
        this.lineData = data;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  increaseDate() {
    const currentDate = this.shiftLineForm.controls['shiftDate'].value;
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    this.shiftLineForm.controls['shiftDate'].setValue(newDate);
  }

  decreaseDate() {
    const currentDate = this.shiftLineForm.controls['shiftDate'].value;
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    this.shiftLineForm.controls['shiftDate'].setValue(newDate);
  }

  checkActiveLine(lineID: any, shift: string, prodDate: string) {
    this.isLoading = true;
    var no = lineID.no;
    this.cService.get(this.urls.checkActiveLine_API_URL+'/'+no).subscribe({
      next: (response) => {
        if (response != null && response != "") {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          this.dialogRef.close();
          Swal.fire({
            icon: 'warning',
            title: 'You can not log into this line. It is already active.',
            showConfirmButton: false,
            timer: 5000
          });
        }
        else {
          this.activeLine(lineID, shift, prodDate);
        }
      }
    })
  }

  activeLine(lineNo: any, shift: string, prodDate: string) {
    this.isLoading = true;
    var no = lineNo.no;
    this.cService.get(this.urls.activateLine_API_URL+'/'+no).subscribe({
      next: (response) => {
        if (response != null && response > 0) {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          this.dialogRef.close();
          Swal.fire({
            icon: 'success',
            title: 'You are log-in successfully',
            showConfirmButton: false,
            timer: 2000
          });
          localStorage.setItem("lineId",no);
          localStorage.setItem("shift",shift);
          localStorage.setItem("prodDate",prodDate);
          this.router.navigate(['/' + this.title.toLowerCase().replace(/\s+/g, '')]);
        } else {
          console.error('Unexpected response:', response);
        }
      },
      error: (error) => {
        console.error('Error activating line:', error);
      }
    });
  }
  onSubmit() {
    let prodLine = localStorage.getItem("prodLineName");
    if (prodLine == ProductionLines.ProScrap) {
      //disable line validation for proScrap
      this.shiftLineForm.controls.lineId.clearValidators();
      this.shiftLineForm.controls.lineId.updateValueAndValidity();
    }
    if (this.shiftLineForm.invalid) {
      return;
    }
    
    let lineId = this.shiftLineForm.controls["lineId"].value;
    let shift = this.shiftLineForm.controls["shift"].value;
    let sDate = formatDate(this.shiftLineForm.controls["shiftDate"].value, 'yyyy-MM-dd', 'en');

    const shiftData = {
      ProdDate: sDate,
      ShiftAMPM: shift
    };
    this.isLoading = true;
 
    this.cService.post(this.urls.checkShift_API_URL, shiftData).subscribe({
      next: (response: { shift: string }[]) => {
        if (response == null) {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          Swal.fire({
            icon: 'warning',
            title: 'Shift Calendar does not exist. See Plant Manager.',
            showConfirmButton: false,
            timer: 5000
          });
        }
        else {
          if (this.isProScrap) {
            this.checkActiveLine(lineId, shift, sDate)
          }
          else {
            localStorage.setItem("shift", shift);
            localStorage.setItem("prodDate", sDate);
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
            this.dialogRef.close();

            this.router.navigate(['/' + this.title.toLowerCase().replace(/\s+/g, '')]);
          }
        }
      },
      error: (error) => {
        console.error("Error checking shift:", error);
      }
    });
  }

}
