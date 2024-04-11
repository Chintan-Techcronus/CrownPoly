import { Component, OnInit } from '@angular/core';
import { FrmPalletComponent } from '../frm-pallet/frm-pallet.component';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/authentication/auth/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { FrmMoveComponent } from '../frm-move/frm-move.component';
import * as XLSX from 'xlsx';
import { APIURL } from 'src/app/services/APIURL';
import { UnTaggedCase } from 'src/app/models/proPalletization/proPalletization';
import { formatDate } from '@angular/common';
import { FrmReprintComponent } from '../frm-reprint/frm-reprint.component';
import Swal from 'sweetalert2';
import { FrmPrintOldTagsComponent } from '../frm-print-old-tags/frm-print-old-tags.component';

@Component({
  selector: 'app-pro-palletization',
  templateUrl: './pro-palletization.component.html',
  styleUrls: ['./pro-palletization.component.css']
})
export class ProPalletizationComponent implements OnInit {

  urls = new APIURL();
  isLoading: boolean = false;
  fileName = 'Untagged Production for ' + formatDate(new Date(), 'dd-mm-yyyy', 'en') + '.xlsx';

  untaggedData: UnTaggedCase[] = [];

  constructor(public dialog: MatDialog, private authService: AuthService, private cService: CommonService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  createProductionTag(): void {
    const dialogRef = this.dialog.open(FrmPalletComponent, {
      width: '500px',
    });
    dialogRef.updatePosition({ top: `80px` })
    dialogRef.disableClose = true;
  }

  moveCaseToAnotherLine(): void {
    const dialogRef = this.dialog.open(FrmMoveComponent, {
      width: '500px',
    });
    dialogRef.updatePosition({ top: `80px` })
    dialogRef.disableClose = true;
  }

  getCurrentCasesUntagged(): void {
    this.isLoading = true;
    this.cService.get(this.urls.palletCasesReport_API_URL).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);

        data.forEach((item: UnTaggedCase) => {
          const { lineNumber, itemNumber, caseCount } = item;
          this.untaggedData.push({ lineNumber, itemNumber, caseCount });
        });

        let heading = [['Line Number', 'Item Number', 'Case Count']];
        const wb = XLSX.utils.book_new();
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.utils.sheet_add_aoa(ws, heading);
        XLSX.utils.sheet_add_json(ws, this.untaggedData, { origin: 'A2', skipHeader: true });
        XLSX.writeFile(wb, this.fileName);
        Swal.fire({
          icon: "success",
          title: "Untagged production report generated successfully.",
          showConfirmButton: false,
          timer: 2000
        });        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  rePrintLastProdTag(): void{
    const dialogRef = this.dialog.open(FrmReprintComponent, {
      width: '500px',
    });
    dialogRef.updatePosition({ top: `80px` })
    dialogRef.disableClose = true;
  }

  printOldLotTag(): void{
    const dialogRef = this.dialog.open(FrmPrintOldTagsComponent, {
      width: '800px',
    });
   // dialogRef.updatePosition({ top: `80px` })
    dialogRef.disableClose = true;
  }

}

