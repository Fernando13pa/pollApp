import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Surveys } from '../../services/surveys';

@Component({
  selector: 'app-create-survey',
  imports: [RouterLink],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurvey {
  public readonly surveyService = inject(Surveys);
  public readonly isSecondQuestionVisible = signal(false);

  public showNextQuestion(): void {
    this.isSecondQuestionVisible.set(true);
  }

  public hideSecondQuestion(): void {
    this.isSecondQuestionVisible.set(false);
  }
}
