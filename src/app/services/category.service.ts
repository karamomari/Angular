import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ICategory } from '../models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.baseurl}/products/categories`);
  }

getProductsByCategory(category: string): Observable<any> {
  return this.http.get<any>(`${environment.baseurl}/products/category/${category}`);
}


}
