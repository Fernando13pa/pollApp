import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
  private readonly router = inject(Router);
  protected readonly surveyService = inject(Surveys);

  private readonly surveyId = Number(this.route.snapshot.paramMap.get('id') ?? 3);

  /** Reactive reference — auto-updates after vote() changes service signals */
  protected readonly survey = computed(() => this.surveyService.getSurveyById(this.surveyId));

  protected readonly selectedOptions = signal<Map<number, string[]>>(new Map());
  protected readonly hasVoted = signal(false);
  protected readonly showResults = signal(true);

  /** Returns true if the given option label is currently selected for a question. */
  protected isSelected(questionId: number, label: string): boolean {
    return (this.selectedOptions().get(questionId) ?? []).includes(label);
  }

  /** Toggles an answer option; supports single-select (radio) and multi-select (checkbox) mode. */
  protected toggleOption(questionId: number, label: string, multiple: boolean): void {
    if (this.hasVoted()) return;
    this.selectedOptions.update((map) => this.updatedSelections(map, questionId, label, multiple));
  }

  private updatedSelections(
    map: Map<number, string[]>, questionId: number, label: string, multiple: boolean,
  ): Map<number, string[]> {
    const newMap = new Map(map);
    const current = newMap.get(questionId) ?? [];
    newMap.set(questionId, multiple ? this.toggleMulti(current, label) : [label]);
    return newMap;
  }

  private toggleMulti(current: string[], label: string): string[] {
    return current.includes(label) ? current.filter((l) => l !== label) : [...current, label];
  }

  /** Submits the selected answers, locks the form, and navigates home after 1 second. */
  protected submitVote(): void {
    if (this.hasVoted()) return;
    this.surveyService.vote(this.surveyId, this.selectedOptions());
    this.hasVoted.set(true);
    setTimeout(() => this.router.navigate(['/']), 1000);
  }

  /** Toggles the visibility of the live results panel. */
  protected toggleResults(): void {
    this.showResults.update((v) => !v);
  }
}
