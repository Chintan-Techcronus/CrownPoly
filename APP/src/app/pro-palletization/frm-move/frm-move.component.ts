import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frm-move',
  templateUrl: './frm-move.component.html',
  styleUrls: ['./frm-move.component.css']
})
export class FrmMoveComponent implements OnInit {

  proFrmMoveForm!: FormGroup;
  urls = new APIURL();
  lineData: any[] = [];
  isLoading: boolean = false;
  selectedItem!: string;
  selectedLine!: string;
  itemData: any[] = [];
  palletSize!: string;
  qty!: string;

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective; //to reset form
  @ViewChild("dialogRef") dialogRef!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private cService: CommonService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getLineNo();
  }

  initializeForm(): void {
    this.proFrmMoveForm = this.fb.group({
      lineId: ['', Validators.required],
      itemKey: ['', Validators.required],
      qty: ['', Validators.required],
      newLineId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.proFrmMoveForm.valid) {
      this.checkQuantity();
    }
  }

  checkQuantity() {
    this.isLoading = true;
    this.qty = this.proFrmMoveForm.controls["qty"].value;
    const dialogRef = this.dialog.open(this.dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = false;
        this.CheckQuantityCommon();
      }
      else{
        this.isLoading = false;
      }
    });
  }

  CheckQuantityCommon() {
    this.isLoading = true;
    const { ...palletCaseCount } = this.proFrmMoveForm.value;
    palletCaseCount.lineId = palletCaseCount.lineId.toString();
    palletCaseCount.qty = palletCaseCount.qty.toString();
    palletCaseCount.newLineId = palletCaseCount.newLineId.toString();
    this.cService.post(this.urls.getPalletCaseCount_API_URL, palletCaseCount).subscribe({
      next: (caseCountQtyTotal) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.checkEnoughCases(caseCountQtyTotal);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  checkEnoughCases(caseCountQtyTotal: any) {
    if (this.qty > caseCountQtyTotal) {
      this.isLoading = false;
      Swal.fire({
        icon: "error",
        title: "Not enought cases!",
        text: "There are not enough cases on this line for the quantity selected.",
      });
      return;
    }
    else {
      this.isLoading = true;
      const { ...movePalletData } = this.proFrmMoveForm.value;
      movePalletData.lineId = movePalletData.lineId.toString();
      movePalletData.qty = movePalletData.qty.toString();
      movePalletData.newLineId = movePalletData.newLineId.toString();
      this.cService.post(this.urls.movePallet_API_URL, movePalletData).subscribe({
        next: () => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          Swal.fire({
            icon: "success",
            title: "Case moved successfully.",
            showConfirmButton: false,
            timer: 2000
          });
          this.dialog.closeAll();
          this.WriteExption();
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
    }
  }

  WriteExption(){
    this.isLoading = true;
    const { ...ExptionData } = this.proFrmMoveForm.value;
    ExptionData.exceptionType = ExptionData.exceptionType.toString();
    ExptionData.exceptionData = ExptionData.exceptionData.toString();
    ExptionData.superID = ExptionData.superID.toString();
    this.cService.post(this.urls.writeException_API_URL, ExptionData).subscribe({
      next: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        // Swal.fire({
        //   icon: "success",
        //   title: "Case moved successfully.",
        //   showConfirmButton: false,
        //   timer: 2000
        // });
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  
  }


  getLineNo() {
    this.isLoading = true;
    this.cService.postWithoutModel(this.urls.getLineNo_API_URL).subscribe({
      next: (data) => {
        this.lineData = data;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  getItem() {
    this.isLoading = true;
    this.cService.get(this.urls.getItem_API_URL + "/" + this.selectedLine).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.itemData = data;
        var itemKeyControl = this.proFrmMoveForm.get('itemKey');
        itemKeyControl?.setValue("");
        var qtyControl = this.proFrmMoveForm.get('qty');
        qtyControl?.setValue("");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getPalletSize() {
    this.isLoading = true;
    this.cService.get(this.urls.getPalletSize_API_URL + "/" + this.selectedItem).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.palletSize = data.caseCount;
        // assign to qty
        this.proFrmMoveForm.patchValue({
          qty: data.caseCount,
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  resetForm() {
    this.formDirective.resetForm();
    this.initializeForm();
  }

}
