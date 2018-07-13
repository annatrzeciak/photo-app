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
  page:number;
  totalItems=1;


  constructor(private photoService: PhotosService) {
    this.loadPhotos(this.page);
   }

  ngOnInit() {
  }

  loadPhotos(number){
   this.photoService.getPhotos(number)
      .then(result => {
        this.totalItems=result.totalHits;
        this.photos = result.hits;
        console.log(this.photos);
      })
      .catch(error => this.showMessage(error));
      
  }
  showMessage(message){
    console.log(message);
  }
  changePage(e){
    console.log(e)
    this.loadPhotos(e.page);
  }

  
}
