import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root',
})

export class AuthGuard implements CanActivate {
    now: Date = new Date();
    constructor(private _router: Router) { }


    async canActivate() {
        var splitted = localStorage.getItem('expires').split(".");
        const date = new Date(splitted[0]);
        var timeDate = (date.getDate() - this.now.getDate());
        var timeHour = (date.getHours() - 3 - this.now.getHours());
        var timeMinutes = (date.getMinutes() - this.now.getMinutes());

        if (timeDate <= 0 && timeHour <= 0 && timeMinutes <= 0) {
            this._router.navigate(['/user-pages/login']);
            return false;
        }
        else {
            return true;
        }
    }
}