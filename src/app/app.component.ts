import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title;
  constructor() {
    this.title = 'Level 3\'s Meat Grinder';
  }

  ngOnInit() {
  }

}
