import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {setTheme} from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router: Router) {
    setTheme('bs4'); // or 'bs4'
    this.router.navigate(['home']);
  }

}
