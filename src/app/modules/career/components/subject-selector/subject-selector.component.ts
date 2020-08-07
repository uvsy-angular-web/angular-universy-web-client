import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Career } from 'src/app/models/career.model';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/core/services/subject.service';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/core/services/program.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AVAIABLE_LEVELS } from 'src/app/models/level';

const FIRST_ITEM_INDEX = 0;
const FIRST_LEVEL = AVAIABLE_LEVELS[FIRST_ITEM_INDEX];

@Component({
  selector: 'app-subject-selector',
  templateUrl: './subject-selector.component.html',
  styleUrls: ['./subject-selector.component.css']
})
export class SubjectSelectorComponent implements OnInit {
  @Input()
  career: Career;
  levels = AVAIABLE_LEVELS;
  programs: Program[] = [];
  subjects: Subject[] = [];
  displayedSubjects: Subject[] = [];
  form: FormGroup;
  selectedSubject: Subject;
  formTitle = 'Seleccione una materia';
  noSubjectMessage = 'No se encontraron materias cargadas para el nivel seleccionado.';
  planSelectLabel = 'Plan: ';
  levelSelectLabel = 'Nivel: ';
  @Output() subjectSelected: EventEmitter<Subject> = new EventEmitter();

  constructor(
    private programService: ProgramService,
    private subjectService: SubjectService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPrograms();
    this.createForm();
  }

  selectSubject(subject: Subject) {
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

  get program(): FormControl {
    return this.form.get('program') as FormControl;
  }

  get level(): FormControl {
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
      (selectedProgram: Program) => this.getSubjects(selectedProgram)
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
    this.displayedSubjects = this.subjects.filter((sbj) => sbj.level === selectedLevel);
  }

  private getSubjects(selectedProgram: Program) {
    this.subjectService.getSubjectsByProgram(selectedProgram)
      .subscribe((subjects: Subject[]) => {
        this.subjects = subjects;

        this.level.setValue(FIRST_LEVEL);
      });
  }

}
