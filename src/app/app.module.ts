import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RandomComponent } from './random/random.component';
import { PhotosService } from './services/photos.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    PhotoAlbumComponent,
    NavbarComponent,
    RandomComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [PhotosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
