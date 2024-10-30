import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';


@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Data from API</h1>
      <pre *ngIf="data">{{ data | json }}</pre>
    </div>
  `
})
export class AppComponent implements OnInit {
  title = 'patientProxy';
  userMessage = '';
  response: any;
  data: any;

  constructor(private dataService: DataService) {}

  async ngOnInit() {
    this.data = await this.dataService.sendMessage("Hello");
  }
}
