import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Program } from 'src/app/models/program.model';

const YEAR_FROM_TEXT = 'Desde';
const YEAR_TO_TEXT = 'Hasta';
const DEFAULT_YEAR_TO_TEXT = 'Indefinido';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styleUrls: ['./program-card.component.css']
})
export class ProgramCardComponent implements OnInit {
  periodText = '';
  seeDetailText = 'Ver resumen';
  @Input() program: Program;
  @Output() tap: EventEmitter<Program> = new EventEmitter<Program>();
  @Output() publishProgram: EventEmitter<Program> = new EventEmitter<Program>();
  @Output() seeDetail: EventEmitter<Program> = new EventEmitter<Program>();

  constructor() { }

  ngOnInit() {
    this.generatePeriodText();
  }

  generatePeriodText() {
    const yearFromText = `${YEAR_FROM_TEXT} ${this.program.yearFrom}`;
    let yearToText = DEFAULT_YEAR_TO_TEXT;

    if (this.program.yearTo) {
      yearToText = `${YEAR_TO_TEXT} ${this.program.yearTo}`;
    }

    this.periodText = `${yearFromText} - ${yearToText}`;
  }

  publish() {
    this.tap.emit(this.program);
  }

  seeMore() {
    this.tap.emit(this.program);
  }
  tapCard() {
    this.tap.emit(this.program);
  }
}
