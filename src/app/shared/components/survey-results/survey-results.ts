import { Component, input } from '@angular/core';

import { SurveyQuestion } from '../../interfaces/survey';

@Component({
  selector: 'app-survey-results',
  imports: [],
  templateUrl: './survey-results.html',
  styleUrl: './survey-results.scss',
})
export class SurveyResults {
  readonly questions = input.required<SurveyQuestion[]>();

  /** Returns true if at least one option across all questions has been voted on. */
  protected hasAnyResults(): boolean {
    return this.questions().some((q) => q.options.some((o) => o.value > 0));
  }

  /** Returns true if the given question has received at least one vote. */
  protected hasResults(question: SurveyQuestion): boolean {
    return question.options.some((option) => option.value > 0);
  }

  /** Calculates the rounded percentage share of a single option within its question total. */
  protected getPercentage(value: number, question: SurveyQuestion): number {
    const total = question.options.reduce((sum, o) => sum + o.value, 0);
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  }
}
