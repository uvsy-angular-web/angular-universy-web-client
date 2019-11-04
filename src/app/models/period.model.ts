export class Period {
  public schedules: Schedule[];
  public professors: Professor[];
  public beginMonth: number;
  public endMonth: number;

  constructor(schedules?: Schedule[],
              proffesors?: Professor[],
              beginMonth?: number,
              endMonth?: number) {
    this.schedules = schedules;
    this.professors = proffesors;
    this.beginMonth = beginMonth;
    this.endMonth = endMonth;
  }
}

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


export class Professor {
  public name: string;
  public lastName: string;
}
