import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Survey } from '../../interfaces/survey';

@Component({
  selector: 'app-survey-card',
  imports: [RouterLink],
  templateUrl: './survey-card.html',
  styleUrl: './survey-card.scss',
})
export class SurveyCard {
  readonly survey = input.required<Survey>();
  readonly compact = input(false);
}
