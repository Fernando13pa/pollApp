import { Component, inject } from '@angular/core';

import { SurveyCard } from '../survey-card/survey-card';
import { Surveys } from '../../services/surveys';

@Component({
  selector: 'app-home',
  imports: [SurveyCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly surveyService = inject(Surveys);
}
