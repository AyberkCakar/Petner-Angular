import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  async canActivate() {
    const response = await this._authService.tokenDecode();
    if(response)
      return true;

    this._router.navigateByUrl('/login');
    return false;
  }
}
