import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Career } from 'src/app/models/career.model';
import { SubjectService } from 'src/app/core/services/subject.service';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/core/services/program.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AVAIABLE_LEVELS } from 'src/app/models/level';
import { ProgramReport } from 'src/app/models/program-report.model';
import { SubjectStat } from 'src/app/models/subject-stat.model';

const FIRST_ITEM_INDEX = 0;
const FIRST_LEVEL = AVAIABLE_LEVELS[FIRST_ITEM_INDEX];

@Component({
  selector: 'app-subject-selector',
  templateUrl: './subject-selector.component.html',
  styleUrls: ['./subject-selector.component.css'],
})
export class SubjectSelectorComponent implements OnInit {
  @Input()
  public career: Career;
  public levels = AVAIABLE_LEVELS;
  public programs: Program[] = [];
  public selectedProgramReport: ProgramReport;
  public displayedSubjects: SubjectStat[] = [];
  public form: FormGroup;
  public selectedSubject: SubjectStat;
  public formTitle = 'Seleccione una materia';
  public noSubjectMessage = 'No se encontraron materias cargadas para el nivel seleccionado.';
  public planSelectLabel = 'Plan: ';
  public levelSelectLabel = 'Nivel: ';
  @Output()
  public subjectSelected: EventEmitter<SubjectStat> = new EventEmitter();

  constructor(
    private programService: ProgramService,
    private formBuilder: FormBuilder) { }

  public ngOnInit() {
    this.getPrograms();
    this.createForm();
  }

  public selectSubject(subject: SubjectStat) {
    this.selectedSubject = subject;
    this.subjectSelected.emit(subject);
  }

  private createForm() {
    this.form = this.formBuilder.group({
      program: new FormControl(),
      level: new FormControl(),
    });

    this.subscribeToProgramChange();
    this.subscribeToLevelChange();
  }

  public get program(): FormControl {
    return this.form.get('program') as FormControl;
  }

  public get level(): FormControl {
    return this.form.get('level') as FormControl;
  }

  private getPrograms() {
    this.programService.getProgramsByCareer(this.career)
      .subscribe((programs: Program[]) => {
        this.programs = programs;
        this.program.setValue(this.programs[FIRST_ITEM_INDEX]);
      });
  }

  private subscribeToProgramChange() {
    this.program.valueChanges.subscribe(
      (selectedProgram: Program) => {
        this.getProgramReport(selectedProgram);
      }
    );
  }

  private subscribeToLevelChange() {
    this.level.valueChanges.subscribe(
      (selectedLevel: number) => {
        this.filterSubjectsForLevel(selectedLevel);
        this.selectSubject(this.displayedSubjects[FIRST_ITEM_INDEX]);
      }
    );
  }

  private filterSubjectsForLevel(selectedLevel: number) {
    this.displayedSubjects = this.selectedProgramReport.subjects.filter((sbj) => sbj.level === selectedLevel);
  }

  private getProgramReport(selectedProgram: Program) {
    this.programService.getProgramStatById(selectedProgram.id)
      .subscribe(
        (programReport: ProgramReport) => {
          this.selectedProgramReport = programReport;
          this.level.setValue(FIRST_LEVEL);
        });
  }
}
