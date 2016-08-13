import { Injectable } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';

@Injectable()
export class LastRouteService {
  public lastUrl: string;
  constructor(private router: Router) {
    router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.lastUrl = router.url;
        }
      });
  }
}
