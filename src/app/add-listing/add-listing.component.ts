import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  /*Declaration of variables */
  title:any;
  owner:any;
  city:any;
  bedrooms:any;
  price:any;
  type:any;
  image:any;
  loading: boolean;
  listings: FirebaseListObservable<any[]>;
  
  /*Dependency Injections */
  constructor(
    private firebaseService : FirebaseService,
    private router: Router,
    private af: AngularFireDatabase,
  ) { 
    this.listings = this.af.list('/listings');
  }

  ngOnInit() {
  }
  
  /*Add functionality*/
  onAddSubmit(){
    this.loading=true;
    let listing={
      title: this.title,
      city: this.city,
      owner: this.owner,
      bedrooms:this.bedrooms,
      price: this.price,
      type:this.type
    }    
    
    this.firebaseService.addListing(listing).then(value => {
        this.loading=false;
        this.listings.push(listing); // then push to database
        this.router.navigate(['/listings']);
    });
  
  }

}
