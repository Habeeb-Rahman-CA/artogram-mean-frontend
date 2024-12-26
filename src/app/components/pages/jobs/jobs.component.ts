import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs',
  imports: [],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {

  sort : boolean = false

  toggleSortOrder(){
    this.sort = !this.sort
  }

}
