import { Injectable } from '@angular/core';
import { MenuContext } from '../components/layout/LayoutOptions';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private menuContextSource = new BehaviorSubject<MenuContext[]>(null);
  menuContext = this.menuContextSource.asObservable();

  constructor() { }

  setMenuContext(context: MenuContext[]) {
    this.menuContextSource.next(context);
  }
}
