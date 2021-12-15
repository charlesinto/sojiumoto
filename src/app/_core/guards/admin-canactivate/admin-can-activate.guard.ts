import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminCanActivateGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const NOT_ALLOWED_ROLES = ['FRONT DESK OFFICER'];
    const user = this.authService.getItem(environment.LOCALSTORAGE_KEY_USER);
    if (NOT_ALLOWED_ROLES.includes(user.role)) {
      this.router.navigateByUrl('/admin/dashboard');
      return false;
    }
    return true;
  }
}
