import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent implements OnInit {
  @Input() successful: boolean = null;

  constructor() { }

  ngOnInit(): void {
  }

}
