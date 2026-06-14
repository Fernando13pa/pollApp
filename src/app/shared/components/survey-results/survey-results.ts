import { Component, input } from '@angular/core';

import { ResultOption } from '../../interfaces/survey';

@Component({
  selector: 'app-survey-results',
  imports: [],
  templateUrl: './survey-results.html',
  styleUrl: './survey-results.scss',
})
export class SurveyResults {
  readonly resultOptions = input.required<ResultOption[]>();
}
