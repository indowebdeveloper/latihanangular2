import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeRoute: string = 'recipe';
  setNavigate(route: string) {
    this.activeRoute = route;
  }
}
