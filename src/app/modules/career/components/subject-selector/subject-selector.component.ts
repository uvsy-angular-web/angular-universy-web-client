import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Career } from 'src/app/models/career.model';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/core/services/subject.service';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/core/services/program.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AVAIABLE_LEVELS } from 'src/app/models/level';
import { ProgramReport, SubjectStat } from 'src/app/models/program-report.model';

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
  selectedProgramReport: ProgramReport;
  displayedSubjects: SubjectStat[] = [];
  form: FormGroup;
  selectedSubject: SubjectStat;
  formTitle = 'Seleccione una materia';
  noSubjectMessage = 'No se encontraron materias cargadas para el nivel seleccionado.';
  planSelectLabel = 'Plan: ';
  levelSelectLabel = 'Nivel: ';
  @Output() subjectSelected: EventEmitter<SubjectStat> = new EventEmitter();

  constructor(
    private programService: ProgramService,
    private subjectService: SubjectService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPrograms();
    this.createForm();
  }

  selectSubject(subject: SubjectStat) {
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
      (selectedProgram: Program) => {
        this.getProgramReport(selectedProgram)
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
          //TODO: Change this once the endpoints adds the attribute level
          this.addLevelToSubjects(selectedProgram)
        });
  }
  private addLevelToSubjects(selectedProgram: Program) {
    this.subjectService.getSubjectsByProgram(selectedProgram)
      .subscribe((subjects: Subject[]) => {
        if (this.selectedProgramReport) {
          subjects.forEach((subject: Subject) => {
            const sameSubjectStat = this.selectedProgramReport.subjects.find(
              (subjectStat: SubjectStat) => subjectStat.subjectId === subject.id
            )
            sameSubjectStat.level = subject.level
          })
        }
      })
  }
}
