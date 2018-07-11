import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../services/photos.service';
import { Response } from "@angular/http";


@Component({
  selector: 'app-photo-album',
  templateUrl: './photo-album.component.html',
  styleUrls: ['./photo-album.component.css']
})
export class PhotoAlbumComponent implements OnInit {

  photos=[];

  constructor(private photoService: PhotosService) {
    this.loadPhotos();
   }

  ngOnInit() {
  }

  loadPhotos(){
   this.photoService.getPhotos()
      .then(result => {
        this.photos = result.hits;
        console.log(this.photos);
      })
      .catch(error => this.showMessage(error));
      
  }
  showMessage(message){
    console.log(message);
  }
}
