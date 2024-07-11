import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavigationService } from '../EndUrl/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
 // Declarar la propiedad previousUrl
 private previousUrl: string | undefined;
  constructor(
    private authService: AuthService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'] as string[];
    const userRoles = this.authService.getRoles();

    if (userRoles.some(role => expectedRoles.includes(role))) {
      return true;
    } else {
        this.router.navigate(['/unauthorized']);
      return false;
    }

  }

}