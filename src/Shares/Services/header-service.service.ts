import { Injectable } from '@angular/core';
import { Header } from '../Header';

@Injectable({
  providedIn: 'root'
})
export class HeaderServiceService {
  public appTitle = Header.appTitle;

  constructor() { }
}
