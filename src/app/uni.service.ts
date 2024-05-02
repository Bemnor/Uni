import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniService {
  FavouriteChanged = new Subject<any>();
  FavouriteUnis: any = [];

  //add uni to favourites
  addfavouriteUni(uni: any) {
    let foundUniInFavourites = false;
    this.FavouriteUnis.forEach((fav: any) => {
      const i = this.FavouriteUnis.indexOf(fav);
      if (uni.name === fav.name) {
        this.FavouriteUnis.splice(i, 1);
        foundUniInFavourites = true;
      }
    });
    if (!foundUniInFavourites) this.FavouriteUnis.push(uni);

    this.FavouriteChanged.next(this.FavouriteUnis.slice());
  }

  //removes given uni from favourite list
  removeFavouriteUni(uni: any) {
    const i = this.FavouriteUnis.indexOf(uni);
    this.FavouriteUnis.splice(i, 1);
    this.FavouriteChanged.next(this.FavouriteUnis.slice());
  }

  updateFavourites(unis: any) {
    this.FavouriteUnis = unis;
    this.FavouriteChanged.next(this.FavouriteUnis.slice());
  }
}
