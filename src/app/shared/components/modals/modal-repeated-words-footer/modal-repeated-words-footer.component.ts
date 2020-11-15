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
  @Input() initialWord = '';
  @Output() cancelAction = new EventEmitter();
  @Output() confirmAction = new EventEmitter();
  onlySearch = false;
  searchAgainTitle = 'Volver a buscar';
  noRepeatedWordFounded = 'No se encontraron materias similares';
  similarWords: string[] = [];

  constructor(private similarWordService: SimilarWordService) { }

  ngOnInit() {
  }

  searchSimilarWords(onlySearch = false) {
    if (this.wordToCompare === this.initialWord) {
      this.onConfirmAction();
    } else {
      this.onlySearch = onlySearch;
      const words = this.pruneWords()
      this.similarWords = this.similarWordService.getSimilarWords(words, this.wordToCompare);
      if (this.similarWords.length === 0 && !this.onlySearch) {
        this.onConfirmAction();
      }
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

  private pruneWords(): string[]{
   return this.words.filter((word: string) => word !== this.initialWord)
  }
}
