import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-no-item-message',
  templateUrl: './no-item-message.component.html',
  styleUrls: ['./no-item-message.component.css']
})
export class NoItemMessageComponent implements OnInit {

  @Input() message: string;
  @Input() size = 'normal';

  constructor() { }

  ngOnInit() {
  }

}
