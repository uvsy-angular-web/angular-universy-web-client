import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-tooltip',
  templateUrl: './help-tooltip.component.html',
  styleUrls: ['./help-tooltip.component.css']
})
export class HelpTooltipComponent implements OnInit {
  @Input() tooltipMessage: string;
  @Input() placement = 'bottom'
  constructor() { }

  ngOnInit() {
  }

}
