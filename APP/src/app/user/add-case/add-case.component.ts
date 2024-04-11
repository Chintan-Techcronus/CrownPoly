import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AddBatchCaseMoodule, LotTracked } from 'src/app/models/case/case';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css']
})
export class AddCaseComponent implements OnInit {
  title: string = "Add Case";
  lineNo: any[] = [];
  orderOptions: any[] = [];
  isLoading: boolean = true;
  caseForm!: FormGroup;
  urls = new APIURL();
  prodDate!: string;
  shift!: string;
  line!: string;
  prodNum!: string;
  quantity!: string;
  lotTracked: LotTracked = {} as LotTracked;
  addbatchrequest: AddBatchCaseMoodule = {} as AddBatchCaseMoodule;

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective; //to reset form

  constructor(private fb: FormBuilder, private cService: CommonService) { }

  ngOnInit(): void {
    this.getLineNo();
    this.initializeForm();
  }

  initializeForm(): void {
    const currentDate = new Date();
    this.caseForm = this.fb.group({
      prodDate: [currentDate, Validators.required],
      shift: ['', Validators.required],
      lineNo: ['', Validators.required],
      prodNum: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }
  onKeyPress(event: KeyboardEvent) {
    if (event.charCode !== 8 && (event.charCode < 48 || event.charCode > 57)) {
      event.preventDefault();
    }
  }
  getLineNo() {
    this.cService.postWithoutModel(this.urls.getLineNo_API_URL).subscribe({
      next: (data) => {
        this.lineNo = data;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  fetchOrdersForLine(selectedLine: number) {
    if (selectedLine) {
      this.isLoading = true;
      const LinesDDL = { lineID: selectedLine }
      this.cService.post(this.urls.getOpenProd_API_URL, LinesDDL).subscribe({
        next: (orders) => {
          if (orders.length <= 0) {
            Swal.fire({
              icon: "error",
              title: "No orders available for " + selectedLine,
            });
            this.isLoading = false;
            this.orderOptions = orders;
          }
          else {
            this.orderOptions = orders;
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      });
    } else {
      console.error("Error");

    }
  }

  onLineChange(event: any) {
    const selectedLine = event.value;
    this.fetchOrdersForLine(selectedLine);
  }

  submitForm() {
    if (this.caseForm.valid) {
      this.isLoading = true;
      this.prodDate = formatDate(this.caseForm.controls["prodDate"].value,'yyyy-MM-dd','en');
      this.shift = this.caseForm.controls["shift"].value;
      this.line = this.caseForm.controls["lineNo"].value;
      this.prodNum = this.caseForm.controls["prodNum"].value;
      this.quantity = this.caseForm.controls["quantity"].value;
      this.lotTracked.lineid = this.line.toString();
      this.lotTracked.proddate = this.prodDate.toString();
      this.lotTracked.prodorderno = this.prodNum.toString();
      this.lotTracked.shift = this.shift.toString();
      this.cService.post(this.urls.getLotTrackedNo_API_URL, this.lotTracked).subscribe({
        next: (batchCaseData) => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          this.addbatchrequest.lineid=this.line;
          this.addbatchrequest.shift=this.shift;
          this.addbatchrequest.proddate=this.prodDate;
          this.addbatchrequest.prodorderno=this.prodNum;
          this.addbatchrequest.lotno=batchCaseData.no;
          this.AddBatchCase(this.addbatchrequest);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    else {
      this.caseForm.markAllAsTouched();
    }
  }

  AddBatchCase(batchCaseData:any) {
    this.isLoading = true;
    this.cService.post(this.urls.getAddBatchCase_API_URL,batchCaseData).subscribe({
      next: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        // reset form
        this.resetForm();
        Swal.fire({
          icon: "success",
          title: "Batch Case added successfully.",
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onReload() {
    this.isLoading = true;
    this.resetForm();
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  resetForm() {
    this.formDirective.resetForm();
    this.initializeForm();
  }
}
