import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PixOMateService {

  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    const url = `https://gorest.co.in/public/v2/${query}`
    const token = '7174138b98697eb61f185e7de56fb9a7c42ba26f104dc228c1ae948d36f3807a'

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<any>(url, { headers })
  }

  getOwners(page: number) {
    return this.getQuery(`users?page=${page}`);
  }
}
