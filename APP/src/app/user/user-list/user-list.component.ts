import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/user/user.model';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  // users: User[] = [];
  users: Users[] =[];
  filteredUsers: MatTableDataSource<Users> = new MatTableDataSource<Users>([]);
  urls = new APIURL();
  filterValue: string = '';
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'roleId', 'roleName', 'prodLines', 'pin', 'isActive', 'actions'];
  isLoading: boolean = true;
  isColumnHidden: boolean = true;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.cService.postWithoutModel(this.urls.getuserList_API_URL).subscribe({
      next: (data) => {
        if (data != null) {
          this.users = data;
          // this.users.forEach(user => {
          //   user.prodLineNames = user.prodLine.map(pl => pl.name).join(', ');
          // });
          this.filteredUsers.data = this.users;
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

  getUserId(userID: string) {

    this.router.navigate(['/add-edit-user', userID]);
  }

  applyFilter(filterValue: string) {
    this.filteredUsers.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.filteredUsers.paginator = this.paginator;
    this.filteredUsers.sort = this.sort;
  }
}
