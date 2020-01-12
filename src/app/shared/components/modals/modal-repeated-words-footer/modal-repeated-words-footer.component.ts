import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ButtonText } from 'src/app/shared/enums/button-text.enum';

@Component({
  selector: 'app-modal-repeated-words-footer',
  templateUrl: './modal-repeated-words-footer.component.html',
  styleUrls: ['./modal-repeated-words-footer.component.css']
})
export class ModalRepeatedWordsFooterComponent implements OnInit {

  @Input() defaultButtonText: ButtonText;
  @Input() similarWords: string[] = [];
  @Input() repeatedWordText: string;

  @Output() cancelAction = new EventEmitter();
  @Output() confirmAction = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  getRepeatedConfirmButtonText(){
    const REPEAT_ACTION_TEXT = ' igual';
    return this.defaultButtonText + REPEAT_ACTION_TEXT;
  }

  onConfirmAction() {
    this.confirmAction.next();
  }

  onCancelAction() {
    this.confirmAction.next();
  }
}
