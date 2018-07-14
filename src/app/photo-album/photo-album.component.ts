import { Component } from "@angular/core";
import { PhotosService } from "../services/photos.service";
import { Response } from "@angular/http";
import { Photo } from "../models/photo";
declare const $: any;

@Component({
  selector: "app-photo-album",
  templateUrl: "./photo-album.component.html",
  styleUrls: ["./photo-album.component.css"]
})
export class PhotoAlbumComponent {
  photos: Array<Photo> = [];
  currentPage: number = 1;
  totalItems: number = 1;
  activeItem: number = 1;
  loading = true;
  errorMessage = "";

  constructor(private photoService: PhotosService) {
    this.loadPhotos(this.currentPage);
  }

  loadPhotos(number) {
    this.loading = true;
    this.currentPage = number;
    this.photoService
      .getPhotos(number)
      .then(result => {
        this.totalItems = result.totalHits;
        this.photos = result.hits;
        this.loading = false;
        
      })
      .catch(error => (this.errorMessage = error));
  }
  changePage(e) {
    this.loading = true;

    this.loadPhotos(e.page);
  }
  closePhotoWindow() {
    $("#photo-window").css("display", "none");
    $("#photo-window img:nth-of-type(2) ").attr({
      src: "",
      alt: "",
      title: ""
    });
  }
  showPhoto(id) {
    this.activeItem = id;
    $("#photo-window img:first-of-type ").attr({
      src: id != 0 ? this.photos[id - 1].largeImageURL : "",
      alt: id != 0 ? this.photos[id - 1].tags : "",
      title:
        id != 0
          ? 'Author: '+this.photos[id - 1].user + ", tags: " + this.photos[id - 1].tags
          : ""
    });
    $("#photo-window img:nth-of-type(2) ").attr({
      src: this.photos[id].largeImageURL,
      alt: this.photos[id].tags,
      title: 'Author: '+this.photos[id].user + ", tags: " + this.photos[id].tags
    });
    $("#photo-window img:nth-of-type(3) ").attr({
      src:
        id != this.photos.length - 1 ? this.photos[id + 1].largeImageURL : "",
      alt: id != this.photos.length - 1 ? this.photos[id + 1].tags : "",
      title:
        id != this.photos.length - 1
          ? 'Author: '+this.photos[id + 1].user + ", tags: " + this.photos[id + 1].tags
          : ""
    });

    $("#photo-window").css("display", "block");
    $("#photo-window #prev-button ").css({ display: "block" });
    $("#photo-window #next-button ").css({ display: "block" });
    if (this.activeItem == 0) {
      $("#photo-window #prev-button ").css({ display: "none" });
    } else if (this.activeItem == this.photos.length - 1) {
      $("#photo-window #next-button ").css({ display: "none" });
    }
  }
  showPrevPhoto() {
    $("#photo-window #next-button ").css({ display: "block" });
    this.activeItem--;
    if (this.activeItem == 0) {
      $("#photo-window #prev-button ").css({ display: "none" });
    } else if (this.activeItem == this.photos.length - 1) {
      $("#photo-window #next-button ").css({ display: "none" });
    }
    $("#photo-window #prev-button ").after(
      '<img alt="' +
        (this.activeItem > 0 ? this.photos[this.activeItem - 1].tags : "") +
        '" title="Author:' +
        (this.activeItem > 0
          ? this.photos[this.activeItem - 1].user +
            ", tags: " +
            this.photos[this.activeItem - 1].tags
          : "") +
        '" src="' +
        (this.activeItem > 0
          ? this.photos[this.activeItem - 1].largeImageURL
          : "") +
        '">'
    );
    $("#photo-window img:nth-of-type(4) ").remove();
  }
  showNextPhoto() {
    $("#photo-window #prev-button ").css({ display: "block" });

    this.activeItem++;
    if (this.activeItem == 0) {
      $("#photo-window #prev-button ").css({ display: "none" });
    } else if (this.activeItem == this.photos.length - 1) {
      $("#photo-window #next-button ").css({ display: "none" });
    }
    $("#photo-window img:nth-of-type(1) ").remove();
    $("#photo-window #next-button ").before(
      '<img alt="' +
        (this.activeItem != this.photos.length - 1
          ? this.photos[this.activeItem + 1].tags
          : "") +
        '" title="Author: ' +
        (this.activeItem != this.photos.length - 1
          ? this.photos[this.activeItem + 1].user +
            ", tags: " +
            this.photos[this.activeItem + 1].tags
          : "") +
        '" src="' +
        (this.activeItem != this.photos.length - 1
          ? this.photos[this.activeItem + 1].largeImageURL
          : "") +
        '">'
    );
  }
}
