import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const pathValue: string = route.routeConfig?.path || '';
    if (this.authService.isAuthenticatedUser()) {
      var prodlinename = localStorage.getItem("prodLineName");
      const selectedProdLines = this.authService.getUserDetails();
      if (prodlinename?.toLowerCase().replace(/\s+/g, '') == pathValue) {
        return true;
      }
      if (selectedProdLines?.roleId == 1) {
        if (pathValue == 'reactivate-line' || pathValue == 'reactivate-line' ||  pathValue == 'add-case') {
          return true;
        }
        else {
          this.router.navigate(['/login']);
          return false;
        }
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false; // Prevent access
    }
  }

}
