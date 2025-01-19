import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileCardComponent } from "../../layout/profile-card/profile-card.component";

@Component({
  selector: 'app-employer-dashboard',
  imports: [RouterModule, ProfileCardComponent],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.css'
})
export class EmployerDashboardComponent {

}
