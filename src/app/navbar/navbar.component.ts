import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  /* Declaration of variables */
  user: Observable<firebase.User>;

  /* Dependency Injections */
  constructor(
    public afAuth: AngularFireAuth,
    public flashMessage: FlashMessagesService,
    private router: Router
  ) { 
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }
  
  /* Login (uses AngularFireAuth Library) */
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  /* Loout (uses AngularFireAuth Library) */
  logout() {
    this.router.navigate(['/']);
    
    this.afAuth.auth.signOut();
    this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout:2000});
  }

}
