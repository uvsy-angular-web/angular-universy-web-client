import { BreadCrum } from 'src/app/models/breadcrum.model';

export enum Route {
  HOME = 'home',
  INSTITUTION = 'institution',
  INSTITUTION_STATS = 'institution/stats',
  CAREER = 'institution/career',
  CAREER_STATS = 'institution/career/stats',
  PROGRAM = 'institution/career/program',
  PROGRAM_STATS = 'institution/career/program/stats',
  PROGRAM_SUMMARY = 'institution/career/program/stats/summary',
  SUBJECT = 'institution/career/program/subject',
  COURSE = 'institution/career/program/subject/course',
}

export const routesBreadcrum: BreadCrum[] = [
  new BreadCrum(1, 'institution', 'Institución'),
  new BreadCrum(2, 'career', 'Carrera'),
  new BreadCrum(3, 'program', 'Plan'),
  new BreadCrum(4, 'subject', 'Materia'),
  new BreadCrum(5, 'course', 'Curso, profesores y horarios'),
];

