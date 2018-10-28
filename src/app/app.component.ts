import { Component } from '@angular/core';
import {
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  Router
} from '@angular/router';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  inProgress: boolean = false;

  constructor(private router: Router, private progressSpinnerServcie: ProgressSpinnerService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart)
        this.inProgress = true;
      else if (event instanceof NavigationEnd || event instanceof NavigationError)
        this.inProgress = false;
    });
    this.progressSpinnerServcie.change.subscribe((status) => {
      this.inProgress = status;
    });
  }

}
