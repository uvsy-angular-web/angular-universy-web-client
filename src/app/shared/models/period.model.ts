export class Period {
  public schedules: Schedule[];
  public proffesors: Professor[];
  public beginMonth: string;
  public endMonth: string;

  constructor(schedules?: Schedule[],
              proffesors?: Professor[],
              beginMonth?: string,
              endMonth?: string) {
    this.schedules = schedules;
    this.proffesors = proffesors;
    this.beginMonth = beginMonth;
    this.endMonth = endMonth;
  }
}

export class Schedule {
  public dayOfWeek: string;
  public beginTime: number;
  public endTime: number;
  public classroom: number;

  constructor(dayOfWeek?: string,
              beginTime?: number,
              endTime?: number,
              classroom?: number) {
    this.dayOfWeek = dayOfWeek;
    this.beginTime = beginTime;
    this.endTime = endTime;
    this.classroom = classroom;
  }
}


export class Professor {
  public name: string;
  public lastName: string;
}
