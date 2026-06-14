import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SurveyResults } from '../survey-results/survey-results';
import { Surveys } from '../../services/surveys';

@Component({
  selector: 'app-survey-detail',
  imports: [RouterLink, SurveyResults],
  templateUrl: './survey-detail.html',
  styleUrl: './survey-detail.scss',
})
export class SurveyDetail {
  private readonly route = inject(ActivatedRoute);
  protected readonly surveyService = inject(Surveys);
  protected readonly survey = this.surveyService.getSurveyById(Number(this.route.snapshot.paramMap.get('id') ?? 3));
}
