import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Surveys } from '../../services/surveys';

@Component({
  selector: 'app-create-survey',
  imports: [RouterLink],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurvey {
  protected readonly surveyService = inject(Surveys);
}
