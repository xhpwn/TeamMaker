import { Component } from "@angular/core";

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
            <span class="glyphicon glyphicon-home"></span>
            <span class="glyphicon glyphicon-indent-left"></span>&nbsp;&nbsp;Teams
            <span class="glyphicon glyphicon-indent-left"></span>&nbsp;&nbsp;Teams
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <span class="glyphicon glyphicon-user"></span> Account
        </ul>
        </div>
    </div>
    </nav>
    `,
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

    username: string;
}