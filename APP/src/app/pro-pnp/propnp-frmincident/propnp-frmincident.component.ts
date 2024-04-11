import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Incident, ProblemArea, RecordIncident } from 'src/app/models/proPNP/proPNP.model';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import { PropnpFrmmainComponent } from '../propnp-frmmain/propnp-frmmain.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-propnp-frmincident',
  templateUrl: './propnp-frmincident.component.html',
  styleUrls: ['./propnp-frmincident.component.css']
})
export class PropnpFrmincidentComponent implements OnInit {
  isLoading: boolean = false;
  time = new Date();
  recordincedent: RecordIncident = {} as RecordIncident;
  incidentlist: Incident[] = [];
  problemarealist : ProblemArea [] = [];
  requestdata: any = {
    ProdDate: '', // from localstorage
    lineID: '', // from localstorage
    shift: '', // from localstorage
  };
  form: FormGroup;
  problemdesc = '';
  startime: any = {
    hour: '',
    minutes: '',
    shift: ''
  }
  endtime: any = {
    hour: '',
    minutes: '',
    shift: ''
  }
  urls = new APIURL();

  constructor(private cService: CommonService, private fb: FormBuilder, public dialogRef: MatDialogRef<PropnpFrmmainComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,) {
    this.form = this.fb.group({
      selectedProblemarea: ['', Validators.required],
      selectedIncident: ['', Validators.required],
      desc: [this.problemdesc],
      checked: [false]
    });
    if (data) {
      this.requestdata = data.name; //get linenno from local storage
    }
  }

  ngOnInit(): void {
    this.formLoad();
  }

  formLoad() {
    this.getTime();
    this.getIncident();
    this.getProblemArea();
  }
  getTime() {
    this.time = new Date();
    this.time.toLocaleString
    this.startime.hour = this.time.getHours();
    this.startime.minutes = this.time.getMinutes();
    // Check whether AM or PM
    this.startime.shift = this.startime.hour >= 12 ? 'PM' : 'AM';
    this.startime.hour = this.startime.hour % 12;
    // To display "0" as "12"
    this.startime.hour = this.startime.hour ? this.startime.hour : 12;
    this.startime.minutes = this.startime.minutes < 10 ? '0' + this.startime.minutes : this.startime.minutes;
    this.recordincedent.StartTime = this.time
    this.recordincedent.StartTime.setHours(this.startime.hour, this.startime.minutes, 0);
  }
  getIncident() {
    this.isLoading = true;
    this.cService.get(this.urls.getProPNPIncidents_API_URL).subscribe({
      next: (responseData: any) => {
        this.incidentlist = responseData;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getProblemArea() {
    this.cService.get(this.urls.getProPNPProblemArea_API_URL).subscribe({
      next: (responseData: any) => {
        this.problemarealist = responseData;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onSelectedIndex(event:any) {
    if (event.value != null) {
      this.cService.post(this.urls.getProPNPProblemDesc_API_URL+'/'+(event.value).toString()).subscribe({
        next: (responseData: any) => {
          this.problemdesc = responseData.defaultDescription;
          this.form.patchValue({ desc: this.problemdesc });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  onTextareaInput(): void {
    const changedValue = this.form.get('desc')?.value;
  }
  onEndClick() {
    this.getendtime()
    if (this.form.valid) {
      this.recordincedent.ProdDate = this.requestdata.ProdDate;
      this.recordincedent.lineID = this.requestdata.lineID;
      this.recordincedent.Shift = this.requestdata.shift;
      this.recordincedent.ProbelmArea = this.form.value.selectedProblemarea;
      this.recordincedent.IncidentCode = this.form.value.selectedIncident;
      this.recordincedent.Description = this.form.get('desc')?.value;
      const checked = this.form.get('checked')?.value;
      this.recordincedent.lineClean = checked == true ? true : false;
      this.cService.post(this.urls.addProPNPRecordIncident_API_URL,this.recordincedent).subscribe({
        next: (responseData: any) => {
          this.dialogRef.close(responseData);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    else {
      return;
    }
  }
  getendtime() {
    this.time = new Date();
    this.time.toLocaleString
    this.endtime.hour = this.time.getHours();
    this.endtime.minutes = this.time.getMinutes();
    // Check whether AM or PM
    this.endtime.shift = this.endtime.hour >= 12 ? 'PM' : 'AM';
    this.endtime.hour = this.endtime.hour % 12;
    // To display "0" as "12"
    this.endtime.hour = this.endtime.hour ? this.endtime.hour : 12;
    this.endtime.minutes = this.endtime.minutes < 10 ? '0' + this.endtime.minutes : this.endtime.minutes;
    this.recordincedent.EndTime = this.time;
    this.recordincedent.EndTime.setHours(this.endtime.hour,this.endtime.minutes, 0);
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}

