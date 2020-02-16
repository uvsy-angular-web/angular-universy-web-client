import { Component, OnInit } from '@angular/core';
import { Career } from 'src/app/models/career.model';
import { Route } from 'src/app/core/services/system/routes/routes.enum';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/core/services/subject.service';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/core/services/program.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CareerService } from 'src/app/core/services/career.service';

const FIRST_ITEM_INDEX = 0;

@Component({
  selector: 'app-career-stats',
  templateUrl: './career-stats.component.html',
  styleUrls: ['./career-stats.component.css']
})
export class CareerStatsComponent implements OnInit {
  career: Career;
  backNavigationRoute = Route.INSTITUTION_STATS;
  programs: Program[] = [];
  subjects: Subject[] = [];
  selectedSubject: Subject;
  form: FormGroup;

  constructor(
    private subjectService: SubjectService,
    private programService: ProgramService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getCareer();
    this.getPrograms();
    this.createForm();
  }

  selectSubject(subject: Subject) {
    this.selectedSubject = subject;
  }

  private getCareer() {
    this.career = CareerService.getCurrentCareer();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      program: new FormControl()
    });

    this.subscribeToProgramChange();
  }


  get program(): FormControl {
    return this.form.get('program') as FormControl;
  }

  private subscribeToProgramChange() {
    this.program.valueChanges.subscribe(
      (selectedProgram: Program) => this.getSubjects(selectedProgram)
    );
  }

  private getSubjects(selectedProgram: Program) {
    this.subjectService.getSubjectsByProgram(selectedProgram)
      .subscribe((subjects: Subject[]) => {
        this.subjects = subjects;
        this.selectedSubject = this.subjects[FIRST_ITEM_INDEX];
      });
  }

  private getPrograms() {
    this.programService.getProgramsByCareer(this.career)
      .subscribe((programs: Program[]) => {
        this.programs = programs;
        this.program.setValue(this.programs[FIRST_ITEM_INDEX]);
      });
  }

}
