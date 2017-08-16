import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class FirebaseService {
  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any>;
  folder: any;
  fileupload: any;
  
  constructor(
    private af: AngularFireDatabase,
    private router: Router
  ) {
    this.listings = this.af.list('/listings') as FirebaseListObservable<Listing[]>;
    this.folder = "listingimages";
  }
  
  getListings(){
    return this.listings;
  }
  
  getListingDetails(id){
    this.listing = this.af.object('/listings/'+id) as FirebaseObjectObservable<Listing>
    return this.listing;
  }
  
  addListingThumbnail(listing){
    // Create root ref
    
    let storageRef = firebase.storage().ref();
    
    let selectedFile = [(<HTMLInputElement>document.getElementById('image')).files[0]][0];
    
    if(selectedFile !== undefined){
      let metadata = {
        contentType: selectedFile.type
      };
      
      let path = `/${this.folder}/${selectedFile.name}`;
      
      return this.fileupload = storageRef.child(path).put(selectedFile, metadata).then((snapshot) => {
        listing.image = snapshot.metadata.name;
        listing.path = snapshot.downloadURL;
      });
    }
      
    }
      
    addListing(listing) {
       // upload image and get url and name of image
      this.addListingThumbnail(listing);      
      return Promise.all([
          this.fileupload //wait for addListingThumbnail to complete
      ]);
    }﻿
    
    updateListing(id, listing){
      
      this.addListingThumbnail(listing);
      return Promise.all([
          this.fileupload //wait for addListingThumbnail to complete 
      ]);
      
    }
    
    deleteListing(id, listing){
      let storageRef = firebase.storage().ref();
      // Create a reference to the file to delete
      let desertRef = storageRef.child(this.folder +'/'+ listing.image);
      
      // Delete the file
      desertRef.delete().then(function() {
        // File deleted successfully
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log(error);
      });
      return this.listings.remove(id);
    }
  

}

interface Listing{
  $key?:String;
  title?:String;
  type?:String;
  image?:String;
  city?:String;
  owner?:String;
  bedrooms?:String;
  path?:String;
}
