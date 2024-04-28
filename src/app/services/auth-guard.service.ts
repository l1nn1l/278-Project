import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private dialog: MatDialog) { }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('Access_Token');
    if (!token) return true;
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  closeDialogs(): void {
    this.dialog.closeAll();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isTokenExpired()) {
      this.closeDialogs();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
