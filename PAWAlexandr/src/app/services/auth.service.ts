import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAdmin: boolean = false;
    private isDevOps: boolean = false;

    setRoles(isAdmin: boolean, isDevOps: boolean) {
        this.isAdmin = isAdmin;
        this.isDevOps = isDevOps;
    }

    get isAdminUser(): boolean {
        return this.isAdmin;
    }

    get isDevOpsUser(): boolean {
        return this.isDevOps;
    }
}
