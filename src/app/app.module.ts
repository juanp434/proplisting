import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';

import * as firebase from 'firebase/app';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListingsComponent } from './listings/listings.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListingComponent } from './listing/listing.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { FirebaseService} from './firebase.service';
import { SearchListingPipe } from './search-listing.pipe';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'listings', component: ListingsComponent},
  {path: 'add-listing', component: AddListingComponent},
  {path: 'listing/:id', component: ListingComponent},
  {path: 'edit-listing/:id', component: EditListingComponent}
];

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDoTqIeymHP7r6jmKOFtrAOVC8dhCfziHw",
  authDomain: "prop-listings-85afe.firebaseapp.com",
  databaseURL: "https://prop-listings-85afe.firebaseio.com",
  projectId: "prop-listings-85afe",
  storageBucket: "prop-listings-85afe.appspot.com",
  messagingSenderId: "46601651490"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    SearchListingPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'proplistings'),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FlashMessagesModule,
    FormsModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
