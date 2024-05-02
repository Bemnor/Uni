import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { UniComponent } from './uni/uni.component';

@Component({
  selector: 'app-uni-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UniComponent],
  templateUrl: './uni-list.component.html',
  styleUrl: './uni-list.component.scss',
})
export class UniListComponent implements OnDestroy {
  link: string = 'http://universities.hipolabs.com/search?country=india';
  subscription: Subscription;

  Universities: any;
  UniLength: number = 0;

  UnisToShow = 15;

  currentUnisCount: number = 0;

  currentUnis: any;

  searchText: string = '';

  constructor(private http: HttpClient) {
    //get universities
    this.subscription = this.http.get<any>(this.link).subscribe({
      next: (data) => {
        this.Universities = data;
        this.UniLength = data.length - this.UnisToShow;
        this.cutUnis(data);
      },
      error: (err) => {
        console.error('Couldnt fetch Names. Error:  ', err);
      },
    });
  }

  //cut out Universities-To-Show out of the available universities
  private cutUnis(data: any) {
    data = data || this.Universities;
    this.currentUnis = data.slice(
      this.currentUnisCount,
      this.currentUnisCount + this.UnisToShow
    );
  }

  get getUnis() {
    if (this.searchText === '') {
      return this.currentUnis;
    } else {
      return this.Universities.filter((obj: any) =>
        obj.name.toLowerCase().includes(this.searchText.toLocaleLowerCase())
      );
    }
  }

  onNextPage() {
    if (this.currentUnisCount < this.UniLength) {
      this.currentUnisCount += this.UnisToShow;
      this.cutUnis(null);
    }
  }
  onBackPage() {
    if (this.currentUnisCount > 0) {
      this.currentUnisCount -= this.UnisToShow;
      this.cutUnis(null);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
