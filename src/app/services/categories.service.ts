import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Iproduct } from '../models/iproduct';
import { ICategory } from '../models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getAllCategories(): Observable<ICategory[]> {
  return this.http.get<ICategory[]>(`${environment.baseurl}/products/categories`)
// .pipe(map(res => res.category));
}

getProductsByCategory(category: string): Observable<Iproduct[]> {
  return this.http.get<{ products: Iproduct[] }>(
    `${environment.baseurl}/products/category/${category}`
  ).pipe(map(res => res.products));
}
}
