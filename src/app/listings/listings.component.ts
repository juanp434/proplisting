import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { SearchListingPipe } from '../search-listing.pipe';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  listings: any;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getListings().subscribe(listings => {
      this.listings = listings;
    });
  }

}
