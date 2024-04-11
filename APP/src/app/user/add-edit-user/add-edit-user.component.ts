import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  userId!: number;
  IsSuper :boolean =false;
  title!: string;
  urls = new APIURL();
  users: User[] = [];
  prodLineData: { id: number, name: string }[] = [];
  isLoading: boolean = true;
  filterText: string = '';
  pinLengthValid: boolean = true;
  @ViewChild('prodLinesSelect') prodLinesSelect!: MatSelect;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private cService: CommonService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) {
        this.title = "Update User";
        this.isEditMode = true;
        this.getUserById(this.userId)
      } else {
        this.title = "Add User";
        this.isEditMode = false;
        this.isLoading = false;
      }
      this.initializeForm();
      this.getProdLines();
    });
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      pin: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      roleId: [false],
      roleName: ['No Need'],
      isActive: [false],
      prodLines: ['', [Validators.required]]
    });
    
    this.userForm.get('roleId')?.valueChanges.subscribe(roleId => {
      this.IsSuper = roleId === 'prosuper';
      if (this.userForm.get('roleId')?.value==true) {
        this.IsSuper=true;
        this.userForm.get('prodLines')?.clearValidators();
        this.userForm.get('prodLines')?.updateValueAndValidity();
        this.userForm.get('prodLines')?.setValue([10]);
        // this.prodLineData[0].id=10;
        this.prodLinesSelect.disabled = true; // Disable the prodLines select
      } else {
        
        this.userForm.get('prodLines')?.setValidators(Validators.required);
        this.userForm.get('prodLines')?.updateValueAndValidity(); 
        this.prodLinesSelect.disabled = false; 
        this.IsSuper=false;// Enable the prodLines select
        this.prodLinesSelect.value = '';
      }
    });
  }
  getProdLines() {
    this.isLoading=true;
    this.cService.postWithoutModel(this.urls.getProdLineList_API_URL).subscribe({
      next: (data: { id: number, name: string }[]) => {
        // data = data.filter(x=>x.name != ProductionLines.ProSuper);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
        this.prodLineData = data;
        // if(this.userForm.get('roleId')?.value==false){
        //   this.prodLineData =this.prodLineData.filter(x=>x.name != ProductionLines.ProSuper);
        // }else{ this.prodLineData = data;}
       
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getUserById(Id: number) {
    this.isLoading=true;
    this.cService.get(this.urls.getUserById_API_URL + '/' + Id).subscribe({
      next: (data: User) => {
        this.userForm.patchValue({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          pin: data.pin,
          roleId: data.roleId === 1 ? true :false,
          isActive: data.isActive

        });
        const prodLinesControl = this.userForm.get('prodLines');
        if (prodLinesControl) {
          prodLinesControl.setValue(data.prodLines.map(pl => pl.id));
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  checkPinExist(pin: number) {
    if (this.userForm.get('pin')?.invalid) {
      return
    }
    this.isLoading = true;
    if (pin !== null) {
      const checkPin = { pin: pin };
      this.cService.post(this.urls.checkPinExist_API_URL, checkPin).subscribe({
        next: (response) => {
          if (response == 0) {
            this.userForm.get('pin')?.reset();
            Swal.fire({
              icon: "error",
              title: "Pin already exists. Please enter a different PIN.",
            });
          }
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        },
        error: (error) => {
          console.error('An error occurred:', error);
        }
      });
    } else {
        setTimeout(() => {
            this.isLoading = false;
        }, 500);
      Swal.fire({
        icon: "error",
        title: "Invalid PIN format. Please enter a 4-digit number.",
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const { roleId, prodLines, ...userData } = this.userForm.value;
      userData.roleId = roleId ? 1 : 2;
      userData.IsSuper = userData.roleId==1 ? true :false;
      userData.prodLines = prodLines.map((id: number) => {
        const productLine = this.prodLineData.find(pl => pl.id === id);
        return productLine ? { id, name: productLine.name } : null;
      });

      if (this.isEditMode) {
        userData.id = this.userId;
        this.updateUser(userData);
      } else {
        this.createUser(userData);
      }
    }
  }

  updateUser(userData: User) {
    this.isLoading = true;
    return this.cService.post(this.urls.updateUser_API_URL, userData).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "User updated successfully",
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/users']);
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (error) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        Swal.fire({
          icon: "error",
          title: "Error updating user",
        });
      },
    });
  }

  createUser(userData: User) {
    this.isLoading = true;
    return this.cService.post(this.urls.addUser_API_URL, userData).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "User added successfully",
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/users']);
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (error) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        Swal.fire({
          icon: "error",
          title: "Error adding user",
        });
      },
    });
  }
}
