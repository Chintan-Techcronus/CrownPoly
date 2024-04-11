import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";
import { ProdLine, User } from "src/app/models/user/user.model";
import { APIURL } from "src/app/services/APIURL";
import { CommonService } from "src/app/services/common.service";
import { ShiftLineComponent } from "../shift-line/shift-line.component";
import { ProductionLines } from "src/app/common/prod-lines.enum";
import { endProduction } from "src/app/models/endProduction/endProduction.model";
import { writeLog } from "src/app/models/writeLog/writeLog.model";
import { formatDate } from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  public urls = new APIURL();
  isLoading: boolean = false;
  endProduction: endProduction = {} as endProduction;
  writeLog: writeLog = {} as writeLog;

  constructor(private cService: CommonService, private router: Router, public dialog: MatDialog) {
    // Check if the user is already authenticated on application startup
    this.isAuthenticated = this.checkIfAuthenticated();
  }

  login(pin: number): Observable<boolean> {
    const loginData = {
      pin: pin,
    };

    // Make the login API call
    return this.cService.post(this.urls.loginUser_API_URL, loginData).pipe(
      map((data: any) => {
        if (data && data.token) {
          this.isAuthenticated = true;
          localStorage.setItem('auth', JSON.stringify({ token: data.token }));
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('userName', data.user.firstName + " " + data.user.lastName);
          return data; 
        }
        else {
          return data;
        }
      }),
       catchError((error: any) => {
         return of(false);
       })
    );
    }

  getUserDetails(): User | undefined {
    var userDetails = this.getUserDetailsFromToken();
    return userDetails;
  }

  getSelectedProdLines(): ProdLine[] | undefined {
    var user = this.getUserDetailsFromToken();
    user!.prodLines = user!.prodLines.filter(x=>x.Name != ProductionLines.ProSuper)
    return user?.prodLines;
  }

  private getUserDetailsFromToken() {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const tokenData = this.decodeToken(JSON.parse(authData).token);
      if (tokenData) {
        let user: User = {
          firstName: tokenData.firstName,
          lastName: tokenData.lastName,
          roleId: tokenData.roleId,
          prodLines: tokenData.prodLines !== undefined ? JSON.parse(tokenData.prodLines) : [], // Array of selected prodLines
        }
        return user;
      }
    }
  }

  private checkIfAuthenticated(): boolean {
    const authData = localStorage.getItem('auth');
    if (authData) {
      return true;
    }
    return false;
  }

  deactivateLine() {
    this.cService.get(this.urls.reactivateLine_API_URL + "/" + localStorage.getItem('lineId')!.toString()).subscribe({
      next: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  logout(lineName: string): void {
    this.isLoading = true;
    let lineId = localStorage.getItem('lineId');
    if (lineId != null) {

      this.deactivateLine();

      this.endProduction.lineId! = localStorage.getItem("lineId")!.toString();
      switch (lineName) {
        case 'HippoSak':
          this.endProduction.workCenter = 'HIPPO SAK CONV'
          this.endProductionForProdLine();
          break;
        case 'PullNPak':
          this.endProduction.workCenter = 'PULL-N-PAK'
          this.endProductionForProdLine();
          break;
        case 'Trash Bag':
          this.endProduction.workCenter = 'TRASH BAG CONV'
          this.endProductionForProdLine();
          break;
        case 'PROSUPER':
          this.endProduction.workCenter = 'PULL-N-PAK'
          this.endProductionForProdLine();
          break;
      }
      this.writeLog.line = localStorage.getItem("lineId")!.toString();
      this.writeLogOnLogout();
    }
    else if (lineName == ProductionLines.ProScrap) {
      this.writeLog.line = 'Scrap Entry';
      this.writeLogOnLogout();
    }

    this.isAuthenticated = false;
    // Remove the token from local storage
    localStorage.clear();
  }

  writeLogOnLogout() {
    // write log on logout
    this.writeLog.userId = localStorage.getItem("userId")!.toString();
    this.writeLog.logIn = new Date(localStorage.getItem("logIn")!.toString()).toISOString();
    this.writeLog.logOut = new Date(formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en')).toISOString();
    this.writeLog.prodDate = new Date(localStorage.getItem("prodDate")!.toString()).toISOString();
    this.writeLog.shift = localStorage.getItem("shift")!.toString();
    this.cService.post(this.urls.writeLog_API_URL, this.writeLog).subscribe({
      next: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  endProductionForProdLine() {
    this.cService.post(this.urls.endProduction_API_URL, this.endProduction).subscribe({
      next: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  private decodeToken(token: string): any {
    // Decode the token to access its payload
    const payload = token.split('.')[1];
    const decodedPayload = window.atob(payload);
    return JSON.parse(decodedPayload);
  }

  shiftLine(productionLine: string, title: string): void {
    const dialogRef = this.dialog.open(ShiftLineComponent, {
      width: '900px',
      height: '400px',
      data: { productionLine: productionLine, title: title }
    });
    dialogRef.disableClose = true;
  }

  openShiftLinePopup(prodlineName: string) {
    const productionLineParam = this.mapProdLineName(prodlineName.trim())
    if (prodlineName === 'HippoSak' && productionLineParam) {
      this.shiftLine(productionLineParam, prodlineName)
    }
    else if (prodlineName === 'Master Strip' && productionLineParam) {
      this.shiftLine(productionLineParam, prodlineName)
    }
    else if (prodlineName === 'Master Roll' && productionLineParam) {
      this.shiftLine(productionLineParam, prodlineName)
    }
    else if (prodlineName === 'Palletization' && productionLineParam) {
      this.router.navigate(['/palletization']);
    }
    else if (prodlineName === 'PullNPak' && productionLineParam) {
      this.shiftLine(productionLineParam, prodlineName)
    }
    else if (prodlineName === 'Repro' && productionLineParam) {
      this.shiftLine(productionLineParam, prodlineName)
    }
    else if (prodlineName === 'Scrap' && productionLineParam) {
      this.shiftLine(productionLineParam, prodlineName)
    }
    else if (prodlineName === 'Strip Cut' && productionLineParam) {
      this.shiftLine(productionLineParam, prodlineName)
    }
    else if (prodlineName === 'Trash Bag' && productionLineParam) {
      this.shiftLine(productionLineParam, prodlineName)
    }    
  }

  private mapProdLineName(prodline: string): ProductionLines | undefined {
    let productionLine: ProductionLines | undefined;
    switch (prodline) {
      case 'HippoSak':
        productionLine = ProductionLines.ProHS;
        break;
      case 'Master Strip':
        productionLine = ProductionLines.ProMasterStrip;
        break;
      case 'Master Roll':
        productionLine = ProductionLines.ProMR;
        break;
      case 'Palletization':
        productionLine = ProductionLines.ProPalletization;
        break;
      case 'PullNPak':
        productionLine = ProductionLines.ProPNP;
        break;
      case 'Repro':
        productionLine = ProductionLines.ProRepro;
        break;
      case 'Scrap':
        productionLine = ProductionLines.ProScrap;
        break;
      case 'Strip Cut':
        productionLine = ProductionLines.ProStripCut;
        break;
      case 'Trash Bag':
        productionLine = ProductionLines.ProTB;
        break;
      default:
        productionLine = undefined;
    }
    return productionLine;
  }


}
