import { Component, OnInit, Input } from '@angular/core';
import { Career } from 'src/app/models/career.model';
import { Route } from 'src/app/core/services/system/routes/routes.enum';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/core/services/subject.service';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/core/services/program.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

const FIRST_PROGRAM_INDEX = 0;

@Component({
  selector: 'app-career-stats',
  templateUrl: './career-stats.component.html',
  styleUrls: ['./career-stats.component.css']
})
export class CareerStatsComponent implements OnInit {
  @Input() career: Career;
  backNavigationRoute = Route.INSTITUTION_STATS;
  programs: Program[] = [];
  subjects: Subject[] = [];
  form: FormGroup;

  constructor(
    private subjectService: SubjectService,
    private programService: ProgramService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getPrograms();
    this.createForm();
  }

  private createForm() {
    const firstProgram = this.programs ? this.programs[FIRST_PROGRAM_INDEX] : null;
    this.form = this.formBuilder.group({
      program : new FormControl(firstProgram)
    });
  }

  private getPrograms() {
    this.programService.getProgramsByCareer(this.career)
      .subscribe((programs: Program[]) => this.programs = programs);
  }

}
