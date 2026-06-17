import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Surveys } from '../../services/surveys';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly surveyService = inject(Surveys);
  protected readonly activeTab = signal<'active' | 'past'>('active');

  /** Switches the survey list between active and past tabs. */
  protected setTab(tab: 'active' | 'past'): void {
    this.activeTab.set(tab);
  }
}
