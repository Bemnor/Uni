import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UniListComponent } from './uni-list/uni-list.component';
import { FavUnisComponent } from './fav-unis/fav-unis.component';
import { UniService } from './uni.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UniListComponent, FavUnisComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Universities';

  constructor(private uniService: UniService) {
    const favourites = localStorage.getItem('Favourites');
    //if there are favourites in localstorage, update favourites in uniService
    setTimeout(() => {
      favourites ? uniService.updateFavourites(JSON.parse(favourites)) : null;
    }, 1000);
  }
}
