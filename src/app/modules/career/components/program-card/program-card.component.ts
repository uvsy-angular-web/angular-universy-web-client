import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/core/services/program.service';

const YEAR_FROM_TEXT = 'Desde';
const YEAR_TO_TEXT = 'Hasta';
const DEFAULT_YEAR_TO_TEXT = 'Indefinido';
const PUBLISHED_PERIOD_STATUS = 'Publicado';
const CURRENT_PERIOD_STATUS = 'Vigente';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styleUrls: ['./program-card.component.css']
})
export class ProgramCardComponent implements OnInit {
  periodText = '';
  seeDetailText = 'Ver resumen';
  isCurrentPeriod = false;
  periodStatusText = PUBLISHED_PERIOD_STATUS;
  publishButtonText = 'Publicar';
  @Input() program: Program;
  @Output() tap: EventEmitter<Program> = new EventEmitter<Program>();
  @Output() publishProgram: EventEmitter<Program> = new EventEmitter<Program>();
  @Output() seeDetail: EventEmitter<Program> = new EventEmitter<Program>();

  constructor() { }

  ngOnInit() {
    this.generatePeriodText();
    this.checkPeriodStatus();
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

  private checkPeriodStatus() {
    this.isCurrentPeriod = ProgramService.checkIfIsCurrentPeriod(this.program);

    this.periodStatusText =
      this.isCurrentPeriod ?
        CURRENT_PERIOD_STATUS
        :
        PUBLISHED_PERIOD_STATUS;
  }
}
