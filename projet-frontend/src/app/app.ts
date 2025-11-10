import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerTopComponent } from './common/banner-top/banner-top.component';
import { BannerBottomComponent } from "./common/banner-bottom/banner-bottom.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BannerTopComponent, BannerBottomComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
