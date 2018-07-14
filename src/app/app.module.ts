import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';


import { AppComponent } from './app.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PhotosService } from './services/photos.service';
import { HttpModule } from '@angular/http';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    PhotoAlbumComponent,
    NavbarComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PaginationModule.forRoot()
  ],
  providers: [PhotosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
