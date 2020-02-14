import { Component, OnInit, Input } from '@angular/core';
import { Career } from 'src/app/models/career.model';
import { SubjectService } from 'src/app/core/services/subject.service';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/core/services/program.service';

@Component({
  selector: 'app-career-stats-card',
  templateUrl: './career-stats-card.component.html',
  styleUrls: ['./career-stats-card.component.css']
})
export class CareerStatsCardComponent implements OnInit {
  @Input() career: Career;
  noProgramTxt = 'no posee programas';

  programs: Program[] = [];

  constructor(private programService: ProgramService) { }

  ngOnInit() {
    this.getPrograms();
  }

  private getPrograms() {
    this.programService.getProgramsByCareer(this.career)
    .subscribe((programs: Program[]) => this.programs = programs);
  }
}
