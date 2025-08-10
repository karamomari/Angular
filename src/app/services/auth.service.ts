import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IUser } from '../models/iuser';
import { LoginUser } from '../models/login-user';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';
import { landreduceser } from '../store/lang.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private manualLogout = false;
  // بيانات المستخدم
  private _user$ = new BehaviorSubject<IUser | null>(this.getStoredUser());
  public user$ = this._user$.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }


  login(user: LoginUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.baseurl}/user/login`, user).pipe(
      map((res) => {
        localStorage.setItem('user_info', JSON.stringify(res));
        this._user$.next(res);
        return res;
      })
    );
  }




  logout() {
    this.manualLogout = true;
    localStorage.removeItem('user_info');
    this._user$.next(null);
    console.log(this.user$);

    this.router.navigateByUrl('/');
  }


  private getStoredUser(): IUser | null {
    const userData = localStorage.getItem('user_info');

    if (!userData || userData === 'undefined' || userData === 'null') {
      return null;
    }

    try {
      return JSON.parse(userData);
    } catch (e) {
      console.error('Error parsing user_info from localStorage', e);
      return null;
    }
  }



  getCurrentUser(): IUser | null {
    return this._user$.value;
  }


  isManualLogout() {
    return this.manualLogout;
  }
  GetToken(): string {
    return localStorage.getItem('token') ?? '';
  }

}
