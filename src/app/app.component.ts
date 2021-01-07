import { LoggingService } from './logging.service';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private logging: LoggingService) {}
  ngOnInit() {
    this.auth.autoLogin();
    this.logging.printLog('Hello AppComponent ngOnInit');
  }
}
