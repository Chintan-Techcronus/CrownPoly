import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Prodlinelist } from 'src/app/common/prodlines-list.enum';

@Component({
  selector: 'app-prod-line-list',
  templateUrl: './prod-line-list.component.html',
  styleUrls: ['./prod-line-list.component.css']
})
export class ProdLineListComponent implements OnInit {
  prodlines: any[] = [];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const selectedProdLines = this.authService.getSelectedProdLines();

    if (typeof selectedProdLines === 'string') {
      try {
        this.prodlines = JSON.parse(selectedProdLines);
      }
      catch (error) {
        console.error('Error parsing selected prodlines JSON:', error);
      }
    }
    else if (Array.isArray(selectedProdLines)) {
      this.prodlines = selectedProdLines;
    }
    else {
      console.error('Selected prodlines is neither a string nor an array:', selectedProdLines);
    }

  }
  redirectToProdlineModule(prodlineName: string) {
    localStorage.setItem("prodLineName", prodlineName);
    this.authService.openShiftLinePopup(prodlineName);
  }

}
