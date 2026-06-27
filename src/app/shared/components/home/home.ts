import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Survey } from '../../interfaces/survey';
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
  protected readonly selectedCategory = signal<string | null>(null);
  protected readonly sortMenuOpen = signal(false);

  protected readonly availableCategories = computed<string[]>(() => {
    const list = this.currentList();
    return [...new Set(list.map((s) => s.tag))];
  });

  protected readonly displayedSurveys = computed<Survey[]>(() => {
    const cat = this.selectedCategory();
    const list = this.currentList();
    return cat ? list.filter((s) => s.tag === cat) : list;
  });

  private currentList(): Survey[] {
    return this.activeTab() === 'active'
      ? this.surveyService.effectiveActiveSurveys()
      : this.surveyService.effectivePastSurveys();
  }

  protected setTab(tab: 'active' | 'past'): void {
    this.activeTab.set(tab);
    this.selectedCategory.set(null);
    this.sortMenuOpen.set(false);
  }

  protected toggleSortMenu(): void {
    this.sortMenuOpen.update((open) => !open);
  }

  protected selectCategory(cat: string | null): void {
    this.selectedCategory.set(cat);
    this.sortMenuOpen.set(false);
  }

  protected closeSortMenu(): void {
    this.sortMenuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.sortMenuOpen.set(false);
  }
}
