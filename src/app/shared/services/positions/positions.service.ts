import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiUrl: string = 'https://ibillboard.com/api'

interface PositionsModel {
  positions: string[]
}

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor(private http: HttpClient) { }

  getPositions() {
    return this.http.get<PositionsModel>(`${apiUrl}/positions`);
  }
}
