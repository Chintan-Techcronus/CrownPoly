import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private intLang = 0;
  
  constructor() { }

  getLang(): number {
    return this.intLang;
  }

  setLang(value: number): void {
    this.intLang = value;
  }
}
