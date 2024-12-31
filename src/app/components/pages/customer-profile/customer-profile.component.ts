import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileCardComponent } from "../../layout/profile-card/profile-card.component";

@Component({
  selector: 'app-customer-profile',
  imports: [ RouterModule, ProfileCardComponent],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {

}
