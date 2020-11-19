import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-printable-section',
  templateUrl: './printable-section.component.html',
  styleUrls: ['./printable-section.component.css']
})
export class PrintableSectionComponent implements OnInit {
  @Input() printTitle: string;
  printStyle = {
    a: { opacity: 0 },
    button: { opacity: 0 },
  };
  printButtonText = 'Imprimir';

  constructor() { }

  ngOnInit() {
  }

}
