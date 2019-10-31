import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  @Input() buttonTitle: string;

  @Output() buttonPressed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  public onPressedAction() {
    this.buttonPressed.emit();
  }
}
