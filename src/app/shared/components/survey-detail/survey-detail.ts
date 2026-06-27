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

  protected readonly survey = computed(() => this.surveyService.getSurveyById(this.surveyId));

  protected readonly selectedOptions = signal<Map<number, string[]>>(new Map());
  protected readonly hasVoted = computed(() => this.surveyService.votedSurveyIds().has(this.surveyId));
  protected readonly showResults = signal(true);

  protected readonly displayQuestions = computed(() => {
    if (this.hasVoted()) return this.survey().questions;
    const selected = this.selectedOptions();
    return this.survey().questions.map((q) => ({
      ...q,
      options: q.options.map((o) => ({
        ...o,
        value: o.value + ((selected.get(q.id) ?? []).includes(o.label) ? 1 : 0),
      })),
    }));
  });

  protected isSelected(questionId: number, label: string): boolean {
    return (this.selectedOptions().get(questionId) ?? []).includes(label);
  }

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

  protected submitVote(): void {
    if (this.hasVoted()) return;
    this.surveyService.vote(this.surveyId, this.selectedOptions());
    this.surveyService.markVoted(this.surveyId);
    setTimeout(() => this.router.navigate(['/']), 1000);
  }

  protected toggleResults(): void {
    this.showResults.update((v) => !v);
  }
}
