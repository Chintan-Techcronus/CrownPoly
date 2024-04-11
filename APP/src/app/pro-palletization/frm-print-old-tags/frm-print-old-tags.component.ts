import { DialogRef } from '@angular/cdk/dialog';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Subscription, interval, map } from 'rxjs';
import { LotTagLits } from 'src/app/models/proPalletization/proPalletization';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frm-print-old-tags',
  templateUrl: './frm-print-old-tags.component.html',
  styleUrls: ['./frm-print-old-tags.component.css']
})
export class FrmPrintOldTagsComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['date','uniqueNo','lotNo','itemNo','lineNo', 'actions'];
  filteredUsers: MatTableDataSource<LotTagLits> = new MatTableDataSource<LotTagLits>([]);
  urls = new APIURL();
  taglist: LotTagLits[] =[];
  isLoading: boolean = true;
  isColumnHidden: boolean = true;
  filterValue: string = '';
  isVisible: boolean = true;
  lineNumber!: string;
  itemNumber!: string;
  lotNumber!: string;
  uniqueNo!: string;
  qr_value!: string;
  tmrUpdateSubscription!: Subscription;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('content') content!: ElementRef;

  constructor(private dialog: MatDialog,private cService: CommonService, private router: Router) { }

  ngOnInit():void {
    // Assign the sample data to the datasource
    this.fetchUsers();
    this.qr_value = "qr";
    // this.dataSource.data = this.data;
    // this.dataSource.paginator = this.paginator;
  }
  fetchUsers() {
    this.cService.get(this.urls.printoldlottag_API_URL).subscribe({
      next: (data) => {
        if (data != null) {
          this.taglist = data;
          this.filteredUsers.data = this.taglist;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
        else{
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.filteredUsers.filter = filterValue.trim().toLowerCase();
  }
  reprint(no: string) {
    this.isLoading=true;
    this.cService.post(this.urls.printlottagbyno_API_URL + '/' + parseInt(no)).subscribe({
      next: (data) => {
        this.itemNumber = data.itemNumber;
        this.lineNumber = data.lineNumber;
        this.lotNumber = data.lotNumber;
        this.uniqueNo = data.uniqueNo;

        this.openPDF();
        // this.userForm.patchValue({
        //   id: data.id,
        //   firstName: data.firstName,
        //   lastName: data.lastName,
        //   pin: data.pin,
        //   roleId: data.roleId === 1 ? true :false,
        //   isActive: data.isActive

        // });
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  cancel() {
    this.isLoading = false;
    this.dialog.closeAll();
  }
  openPDF() {
    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Lot Tag', 20, 20);
    doc.setFontSize(14);

    doc.text("Item No.:", 20, 35);
    doc.text(this.itemNumber.toString(), 70, 35);

    doc.text('Line No:', 20, 45);
    doc.text(this.lineNumber.toString(), 70, 45);

    doc.text('Unique No:', 20, 55);
    doc.text(this.uniqueNo.toString(), 70, 55);

    doc.setFontSize(19);

    doc.text('Lot No.:', 20, 65);
    doc.text(this.lotNumber.toString(), 70, 65);

    doc.setFontSize(14);
    doc.save('Crown Poly Lot Tag.pdf');

    this.qr_value = this.itemNumber + "_" + this.lotNumber+ "_"+this.lineNumber + "_" + this.uniqueNo;
    this.tmrUpdateSubscription = interval(1000).pipe(
      map(() => {
        this.makePdf();
      })
    ).subscribe(() => {
      // Unsubscribe to stop the interval
      if (this.tmrUpdateSubscription) {
        this.tmrUpdateSubscription.unsubscribe();
      }
    });
  }

  makePdf() {
    this.isLoading = true;
    let doc = new jsPDF();
    doc.html(this.content.nativeElement, {
      callback: (pdf) => {
        pdf.save('Crown Poly Production Lot Tag - QR.pdf');
        this.isVisible = false;
        this.isLoading = false;
        Swal.fire({
          icon: "success",
          title: "Production lot tag reprinted successfully.",
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  ngAfterViewInit() {
    this.filteredUsers.paginator = this.paginator;
    this.filteredUsers.sort = this.sort;
  }
}
