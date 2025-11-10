import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner-top',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './banner-top.component.html',
  styleUrl: './banner-top.component.css'
})
export class BannerTopComponent {
  
}
