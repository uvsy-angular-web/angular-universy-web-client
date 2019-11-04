import {Component, Input, OnInit} from '@angular/core';
import {Period} from '../../../../models/period.model';
import {TimeService} from '../../../../core/services/time.service';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {
  @Input() periods: Period[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  public getPeriodRangeTitle(period: Period): string {
    const beginMonthName = TimeService.getNameOfMonth(period.beginMonth);
    const endMonthName = TimeService.getNameOfMonth(period.endMonth);
    return `${beginMonthName} - ${endMonthName}`;
  }

}
