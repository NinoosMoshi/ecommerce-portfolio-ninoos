import { ProductCategory } from './../common/product-category';
import { Product } from './../common/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  private baseUrl = "http://localhost:8080/api/products";

  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient:HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {
    
   // need to build URL based on product id
   const productUrl = `${this.baseUrl}/${theProductId}`;

   return this.httpClient.get<Product>(productUrl);

  }

 


      // pagination
  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size
     const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}&size=${thePageSize}`;
     return this.httpClient.get<GetResponseProducts>(searchUrl);
     }



      



  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id
     const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

     return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
       map(response => response._embedded.products)
     );
  }


  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }



  searchProducts(theKeyword:string): Observable<Product[]>{

    // need to build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  // pagination support input search
  searchProductsPaginate(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseProducts> {

    // need to build URL based on keyword, page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
     }



}


interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}


interface GetResponseProducts {

  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    tatalPages: number,
    number: number
  }

}


