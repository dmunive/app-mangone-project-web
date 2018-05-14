import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { 
    this.authenticationService.authenticationEmitter.subscribe((mode)=>{
      this.isAuthenticated = mode;
    });
  }

  ngOnInit() {
  }

  public signOut(){
    this.authenticationService.signOut();
    this.authenticationService.setAuthentication();
    this.router.navigate(['/login']);
  }

}
