import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-navbar',
    templateUrl: `
    <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>                        
        </button>
        <a onmouseover="this.style.cursor = 'default'" class="navbar-brand navmain"><span class="glyphicon glyphicon-indent-left"></span> TeamMaker</a>
      </div>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
          <li routerLinkActive="active" onmouseover="this.style.cursor = 'pointer'"><a [routerLink]="['/home']"><span class="glyphicon glyphicon-home"></span></a></li>
          <li *ngIf="isLoggedIn()" routerLinkActive="active" onmouseover="this.style.cursor = 'pointer'"><a [routerLink]="['/teams']"><span class="glyphicon glyphicon-indent-left"></span>&nbsp;&nbsp;Teams</a></li>
          <li *ngIf="!isLoggedIn()" routerLinkActive="active" onmouseover="this.style.cursor = 'pointer'"><a [routerLink]="['/nouser']"><span class="glyphicon glyphicon-indent-left"></span>&nbsp;&nbsp;Teams</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li routerLinkActive="active"><a [routerLink]="['/auth']"><span class="glyphicon glyphicon-user"></span> Account</a></li>
        </ul>
      </div>
    </div>
  </nav>
    `,
    styles: [`
    body {
        padding-top: 50px;
        position: relative;
    }
    
    pre {
        tab-size: 8;
    }
    
    .navmain {
        color: white;
        padding-right: 50px;
    }
    `]
})

export class NavbarComponent {
    constructor(private authService: AuthService) {}

    username: string;
    isLoggedIn() {
        this.username = localStorage.getItem('userName');
        return this.authService.isLoggedIn();
    }
}