import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { LineRequest } from 'src/app/models/case/case';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reactivate-line',
  templateUrl: './reactivate-line.component.html',
  styleUrls: ['./reactivate-line.component.css']
})
export class ReactivateLineComponent implements OnInit {
  reactivateLineForm: any;
  isLoading: any;
  linesData: LineRequest[]=[];
  urls = new APIURL();
  lineId!: string;
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective; //to reset form
  systemId: any;

  constructor(private fb: FormBuilder, private cService: CommonService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.bindLines();
  }

  initializeForm(): void {
    this.reactivateLineForm = this.fb.group({
      lineId: ['', Validators.required],
    });
  }

  bindLines() {
    this.isLoading = true;
    this.cService.get(this.urls.getClosedLines_API_URL).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.linesData = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getSystemId(event: any){
    const selectedOption = event.source.selected as any; // Get the selected mat-option
    const systemId =   selectedOption._element.nativeElement.getAttribute('data-systemid');
    this.systemId = systemId;
  }


  onSubmit() {
    if (this.reactivateLineForm.valid) {
      this.isLoading = true;
      this.lineId = this.reactivateLineForm.controls["lineId"].value;
      this.cService.get(this.urls.reactivateLine_API_URL+"/"+this.lineId).subscribe({
        next: () => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          Swal.fire({
            icon: "success",
            title: "Line ReActivated successfully.",
            showConfirmButton: false,
            timer: 2000
          });
          this.bindLines();
          this.resetForm();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  resetForm() {
    this.formDirective.resetForm();
    this.initializeForm();
  }

  RefreshLines() {
    this.isLoading = true;
    this.resetForm();
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
