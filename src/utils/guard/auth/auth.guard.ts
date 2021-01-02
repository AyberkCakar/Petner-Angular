import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {formatDate} from '@angular/common';
@Injectable({
    providedIn: 'root',
})

export class AuthGuard implements CanActivate {
    constructor(private _router: Router) { }


    async canActivate() {
        var splitted = localStorage.getItem('expires').split(".");
        const date = formatDate(new Date(splitted[0]),'yyyy-MM-dd HH:mm:ss','en_US');
        const dateNow = formatDate(new Date(),'yyyy-MM-dd HH:mm:ss','en_US');

        if (dateNow> date) {
            this._router.navigate(['/user-pages/login']);
            return false;
        }
        else {
            return true;
        }
    }
}