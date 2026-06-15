import { Injectable, signal } from '@angular/core';

import { ResultOption, Survey } from '../interfaces/survey';

@Injectable({
  providedIn: 'root',
})
export class Surveys {
  readonly urgentSurveys = signal<Survey[]>([
    {
      id: 1,
      title: 'Let’s Plan the Next Team Event Together',
      description: 'Choose the activity that fits the next team day best.',
      deadline: 'Ends in 1 Day',
      tag: 'Team activities',
      isUrgent: true,
      progress: 82,
    },
    {
      id: 2,
      title: 'Fit & wellness survey!',
      description: 'Vote for habits and routines that support a healthier week.',
      deadline: 'Ends in 2 Days',
      tag: 'Health & Wellness',
      isUrgent: true,
      progress: 68,
    },
    {
      id: 6,
      title: 'Gaming habits and favorite games!',
      description: 'Tell the team what you play and what should be next.',
      deadline: 'Ends in 3 Days',
      tag: 'Gaming & Entertainment',
      isUrgent: true,
      progress: 74,
    },
  ]);

  readonly surveys = signal<Survey[]>([
    {
      id: 3,
      title: 'Let’s Plan the Next Team Event Together',
      description: 'Choose the activity that fits the next team day best.',
      deadline: 'Ends in 1 Day',
      tag: 'Team activities',
      isUrgent: false,
      progress: 54,
    },
    {
      id: 4,
      title: 'Gaming habits and favorite games!',
      description: 'Tell the team what you play and what should be next.',
      deadline: 'Ends in 3 Day',
      tag: 'Gaming',
      isUrgent: false,
      progress: 39,
    },
    {
      id: 5,
      title: 'Gaming habits and favorite games!',
      description: 'Tell the team what you play and what should be next.',
      deadline: 'Ends in 3 Day',
      tag: 'Gaming',
      isUrgent: false,
      progress: 72,
    },
    {
      id: 7,
      title: 'Healthier future: Fit & wellness survey!',
      description: 'Vote for habits and routines that support a healthier week.',
      deadline: 'Ends in 2 Day',
      tag: 'Healthy Lifestyle',
      isUrgent: false,
      progress: 64,
    },
    {
      id: 8,
      title: 'Healthier future: Fit & wellness survey!',
      description: 'Vote for habits and routines that support a healthier week.',
      deadline: 'Ends in 2 Day',
      tag: 'Healthy Lifestyle',
      isUrgent: false,
      progress: 47,
    },
    {
      id: 9,
      title: 'Let’s Plan the Next Team Event Together',
      description: 'Choose the activity that fits the next team day best.',
      deadline: 'Ends in 1 Day',
      tag: 'Team activities',
      isUrgent: false,
      progress: 79,
    },
  ]);

  readonly resultOptions = signal<ResultOption[]>([
    { label: 'Option A', value: 48 },
    { label: 'Option B', value: 32 },
    { label: 'Option C', value: 20 },
  ]);

  readonly draftOptions = signal<string[]>([
    'A calm dashboard for daily use',
    'A playful survey experience',
    'A faster mobile voting flow',
  ]);

  getSurveyById(id: number): Survey {
    return [...this.urgentSurveys(), ...this.surveys()].find((survey) => survey.id === id) ?? this.surveys()[0];
  }
}
