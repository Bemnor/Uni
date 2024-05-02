import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { UniService } from '../../uni.service';

@Component({
  selector: 'app-uni',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uni.component.html',
  styleUrl: './uni.component.scss',
})
export class UniComponent {
  @Input() uni: any;

  constructor(private uniService: UniService) {
    setTimeout(() => {
      const tempLocalUnis = localStorage.getItem('Favourites');
      if (tempLocalUnis) {
        JSON.parse(tempLocalUnis).forEach((uni: any) => {
          if (this.uni) {
            uni.name === this.uni.name ? (this.uni.Favourited = true) : null;
          }
        });
      }
    }, 200);
  }

  onFavouriteClicked() {
    this.uni.Favourited = !this.uni.Favourited;
    this.uniService.addfavouriteUni(this.uni);
  }
}
