import { Component, OnInit, Input } from '@angular/core';
import { GraphItem } from 'src/app/shared/components/graph-bar/graph-bar.component';

@Component({
  selector: 'app-graph-and-description',
  templateUrl: './graph-and-description.component.html',
  styleUrls: ['./graph-and-description.component.css'],
})
export class GraphAndDescriptionComponent implements OnInit {
  @Input()
  public percentage = false;
  @Input()
  public title: string;
  @Input()
  public leyend: string;
  @Input()
  public items: GraphItem[] = [];

  constructor() { }

  public ngOnInit() {
  }

}
