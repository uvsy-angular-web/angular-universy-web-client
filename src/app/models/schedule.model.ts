
export class Schedule {
  public dayOfWeek: string;
  public beginTime: number;
  public endTime: number;
  public classroom: string;

  constructor(dayOfWeek?: string,
              beginTime?: number,
              endTime?: number,
              classroom?: string) {
    this.dayOfWeek = dayOfWeek;
    this.beginTime = beginTime;
    this.endTime = endTime;
    this.classroom = classroom;
  }
}
