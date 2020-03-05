import { Component, OnInit, Input } from '@angular/core';
const MAX_PERCENTAGE = 100;

@Component({
  selector: 'app-graph-bar',
  templateUrl: './graph-bar.component.html',
  styleUrls: ['./graph-bar.component.css']
})
export class GraphBarComponent implements OnInit {
  @Input() title: string;
  @Input() items: GraphItem[] = [];
  @Input() percentage = false;
  maxValue: number;
  maxValuePercentage: number;
  constructor() { }

  ngOnInit() {
    this.calculateMaxValue();
    this.calculateHeights();
  }

  private calculateHeights() {
    this.items.forEach(
      (item) => {
        item.percentage = this.calculatePercentage(item.value);
      }
    );
  }

  private calculatePercentage(value: number) {
    return value * (MAX_PERCENTAGE / this.maxValue);
  }

  private calculateMaxValue() {
    const values = this.items.map((item) => item.value);
    this.maxValue = Math.max(...values);
  }
}

export class GraphItem {
  label: string;
  value: number;
  percentage: number;

  constructor(label: string, value: number) {
    this.label = label;
    this.value = value;
  }
}
