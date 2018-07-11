import { Injectable } from '@angular/core';
import { Http , Response} from "@angular/http";

@Injectable()
export class PhotosService {
  key :string ='6530904-2d22de7109299706e1d2ddc39';
  constructor(private http: Http) { }

  getPhotos(){
    return this.http
      .get('https://pixabay.com/api/?key='+this.key+'&q=&page=&image_type=photo','')
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
    ;

  }
  private extractData(res: Response): any {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
