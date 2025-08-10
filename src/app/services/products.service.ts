import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Iproduct } from '../models/iproduct';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  GetFeaturedProducts(): Observable<Iproduct[]> {
    return this.http.get<{ products: Iproduct[] }>(`${environment.baseurl}/products?limit=8`)
      .pipe(map(res => res.products));
  }
  GetProdectById(id: number): Observable<Iproduct> {
    return this.http.get<Iproduct>(`${environment.baseurl}/products/${id}`);
  }

  GetAllProdect(): Observable<Iproduct[]> {
     return this.http.get<{ products: Iproduct[] }>(`${environment.baseurl}/products?limit=70`)
      .pipe(map(res => res.products));
  }

GetAllIdOfProdect(): Observable<number[]> {
  return this.http.get<{ products: Iproduct[] }>(`${environment.baseurl}/products`)
    .pipe(map(res => res.products.map(p => p.id)));
}


GetAllProdectWithNext(skip: number = 0, limit: number = 12): Observable<Iproduct[]> {
  return this.http
    .get<{ products: Iproduct[] }>(`${environment.baseurl}/products?limit=${limit}&skip=${skip}`)
    .pipe(map(res => res.products));
}



}
