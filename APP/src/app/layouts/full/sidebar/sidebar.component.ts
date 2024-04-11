import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth/auth.service';
import { Menu, MenuItems } from '../../../shared/menu-items/menu-items';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  shouldDisplayMenu(menuitem: Menu): boolean {
    const ProdLines = localStorage.getItem("prodLineName");
    const selectedProdLines = this.authService.getUserDetails();
    if (selectedProdLines?.roleId == 1) {
          return menuitem.name === "Users" || menuitem.name === "Add Case" || menuitem.name === "ReActivate Line";
    }
    if (selectedProdLines?.prodLines.length === 1) {
      return menuitem.name === selectedProdLines.prodLines[0].Name;
    }
    else {
      return ProdLines?.includes(menuitem.name) ?? false;
    }
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
 
}
