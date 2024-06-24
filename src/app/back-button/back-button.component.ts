import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent implements OnInit {

  constructor(
	  private location: Location,
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
	this.location.back();
  }

}