import { Component, OnDestroy, OnInit } from '@angular/core';
import { UniService } from '../uni.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fav-unis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fav-unis.component.html',
  styleUrl: './fav-unis.component.scss',
})
export class FavUnisComponent implements OnDestroy {
  favUnis: any;
  subscription: Subscription;

  constructor(private uniService: UniService) {
    this.subscription = uniService.FavouriteChanged.subscribe((unis) => {
      // console.log('Got Favourites!', unis);
      this.favUnis = unis;
      localStorage.setItem('Favourites', JSON.stringify(this.favUnis));
    });
  }

  //fav is short for favourite university
  onUnFavourite(fav: any) {
    this.uniService.removeFavouriteUni(fav);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
