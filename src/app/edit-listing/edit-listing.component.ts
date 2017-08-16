import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  id;
  title;
  owner;
  city;
  bedrooms;
  price;
  type;
  loading:boolean;
  listings: FirebaseListObservable<any[]>;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private af: AngularFireDatabase,
  ) {
    this.listings = this.af.list('/listings');
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    this.firebaseService.getListingDetails(this.id).subscribe( listing => {
      this.title = listing.title;
      this.owner = listing.owner;
      this.city = listing.city;
      this.bedrooms = listing.bedrooms;
      this.price = listing.price;
      this.type = listing.type;
    });  
    
  }
  
  onEditSubmit(){
    this.loading=true;
    
    let listing = {
      title: this.title,
      owner: this.owner,
      city: this.city,
      bedrooms: this.bedrooms,
      price: this.price,
      type: this.type
    }    
    this.firebaseService.updateListing(this.id, listing).then(value => {
        this.loading=false;
        this.listings.update(this.id, listing); // then push to database
        this.router.navigate(['/listings']);
    });

  }

}
