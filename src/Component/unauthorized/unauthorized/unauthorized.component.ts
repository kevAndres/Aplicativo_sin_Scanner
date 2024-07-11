import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../app/services/EndUrl/navigation.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {

  constructor(private router: Router, private navigationService: NavigationService) {}

  goBack() {
    const previousUrl = this.navigationService.getPreviousUrl();
    if (previousUrl) {
      this.router.navigateByUrl(previousUrl);
    } else {
      //this.router.navigate(['/home']);  // Ruta por defecto si no hay URL anterior
    }
  }
}
