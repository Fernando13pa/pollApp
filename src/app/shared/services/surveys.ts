import { Injectable, signal } from '@angular/core';

import { ResultOption, Survey } from '../interfaces/survey';

@Injectable({
  providedIn: 'root',
})
export class Surveys {
  readonly urgentSurveys = signal<Survey[]>([
    {
      id: 1,
      title: 'Team lunch for launch day',
      description: 'Choose the menu before the weekly sync closes.',
      deadline: 'Ends in 3 Days',
      tag: 'Urgent',
      isUrgent: true,
      progress: 82,
    },
    {
      id: 2,
      title: 'Which feature should ship first?',
      description: 'Vote on the dashboard improvement with the highest impact.',
      deadline: 'Ends in 5 Days',
      tag: 'Product',
      isUrgent: true,
      progress: 68,
    },
  ]);

  readonly surveys = signal<Survey[]>([
    {
      id: 3,
      title: 'What would work best for your team?',
      description: 'Pick the collaboration rhythm you would like to test next.',
      deadline: 'Ends in 8 Days',
      tag: 'Active',
      isUrgent: false,
      progress: 54,
    },
    {
      id: 4,
      title: 'Favorite category for the next game night',
      description: 'Board games, quizzes, or something completely new.',
      deadline: 'Ends in 12 Days',
      tag: 'Social',
      isUrgent: false,
      progress: 39,
    },
    {
      id: 5,
      title: 'Best time for design review',
      description: 'Help us place the critique session where everyone can join.',
      deadline: 'Ends in 14 Days',
      tag: 'Design',
      isUrgent: false,
      progress: 72,
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
