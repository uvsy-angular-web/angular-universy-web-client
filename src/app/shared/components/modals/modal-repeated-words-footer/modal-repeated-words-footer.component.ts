import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ButtonText } from 'src/app/shared/enums/button-text.enum';
import { SimilarWordService } from 'src/app/core/services/validator/repeated-text.service';

@Component({
  selector: 'app-modal-repeated-words-footer',
  templateUrl: './modal-repeated-words-footer.component.html',
  styleUrls: ['./modal-repeated-words-footer.component.css']
})
export class ModalRepeatedWordsFooterComponent implements OnInit {

  @Input() defaultButtonText: ButtonText;
  @Input() similarWordsCallback: () => string[];
  @Input() repeatedWordText: string;
  @Input() words: string[] = [];
  @Input() wordToCompare: string;
  @Output() cancelAction = new EventEmitter();
  @Output() confirmAction = new EventEmitter();

  similarWords: string[] = [];

  constructor(private similarWordService: SimilarWordService) { }

  ngOnInit() {
  }

  searchSimilarWords() {
    this.similarWords = this.similarWordService.getSimilarWords(this.words, this.wordToCompare);
    if (this.similarWords.length === 0) {
      this.onConfirmAction();
    }
  }

  getRepeatedConfirmButtonText() {
    const REPEAT_ACTION_TEXT = ' igual';
    return this.defaultButtonText + REPEAT_ACTION_TEXT;
  }

  onConfirmAction() {
    this.confirmAction.next();
  }

  onCancelAction() {
    this.cancelAction.next();
  }
}
