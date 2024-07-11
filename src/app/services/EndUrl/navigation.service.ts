import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private previousUrl: string | undefined;
  private currentUrl: string | undefined;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;
        }
      });
  }

  public setPreviousUrl(url: string) {
    this.previousUrl = url;
  }

  public getPreviousUrl(): string | undefined {
    return this.previousUrl;
  }
}
