import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Surveys } from '../../services/surveys';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly surveyService = inject(Surveys);
}
