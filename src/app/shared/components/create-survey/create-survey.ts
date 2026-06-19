import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Surveys } from '../../services/surveys';

interface DraftAnswer {
  text: string;
}

interface DraftQuestion {
  title: string;
  multiple: boolean;
  answers: DraftAnswer[];
}

@Component({
  selector: 'app-create-survey',
  imports: [RouterLink],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurvey {
  private readonly surveyService = inject(Surveys);
  private readonly router = inject(Router);

  readonly surveyTitle = signal('');
  readonly surveyDescription = signal('');
  readonly surveyEndDate = signal('');
  readonly surveyTag = signal('');
  readonly isCategoryMenuOpen = signal(false);
  readonly showConfirm = signal(false);
  private newSurveyId: number = 0;

  readonly CATEGORIES = [
    'Team Activities',
    'Health & Wellness',
    'Gaming & Entertainment',
    'Education & Learning',
    'Lifestyle & Preferences',
    'Technology & Innovation',
  ] as const;

  readonly questions = signal<DraftQuestion[]>([
    { title: '', multiple: false, answers: [{ text: '' }, { text: '' }] },
  ]);

  /** True when the title is filled and every question has a title plus at least two answers. */
  readonly isValid = computed(() => {
    const titleOk = this.surveyTitle().trim() !== '';
    const questionsOk = this.questions().every(
      (q) =>
        q.title.trim() !== '' &&
        q.answers.filter((a) => a.text.trim() !== '').length >= 2,
    );
    return titleOk && this.questions().length > 0 && questionsOk;
  });

  readonly isSingleQuestion = computed(() => this.questions().length === 1);
  readonly hasExpandedSingleQuestion = computed(() => {
    const firstQuestion = this.questions()[0];
    return this.isSingleQuestion() && firstQuestion.answers.length > 2;
  });
  readonly hasExpandedForm = computed(
    () => this.questions().length > 1 || this.hasExpandedSingleQuestion(),
  );

  protected inputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected checkboxChecked(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  toggleCategoryMenu(): void {
    this.isCategoryMenuOpen.update((isOpen) => !isOpen);
  }

  selectCategory(category: string): void {
    this.surveyTag.set(category);
    this.isCategoryMenuOpen.set(false);
  }

  /** Appends a new blank question with two empty answer slots to the draft. */
  addQuestion(): void {
    this.questions.update((qs) => [
      ...qs,
      { title: '', multiple: false, answers: [{ text: '' }, { text: '' }] },
    ]);
  }

  /** Resets question 0 to blank; removes any other question by index. */
  removeQuestion(index: number): void {
    if (index === 0) {
      this.questions.update((qs) =>
        qs.map((q, i) =>
          i === 0
            ? { title: '', multiple: false, answers: [{ text: '' }, { text: '' }] }
            : q,
        ),
      );
    } else {
      this.questions.update((qs) => qs.filter((_, i) => i !== index));
    }
  }

  setQuestionTitle(index: number, value: string): void {
    this.questions.update((qs) =>
      qs.map((q, i) => (i === index ? { ...q, title: value } : q)),
    );
  }

  setQuestionMultiple(index: number, checked: boolean): void {
    this.questions.update((qs) =>
      qs.map((q, i) => (i === index ? { ...q, multiple: checked } : q)),
    );
  }

  addAnswer(questionIndex: number): void {
    this.questions.update((qs) =>
      qs.map((q, i) =>
        i === questionIndex ? { ...q, answers: [...q.answers, { text: '' }] } : q,
      ),
    );
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.questions.update((qs) =>
      qs.map((q, i) =>
        i === questionIndex
          ? { ...q, answers: q.answers.filter((_, ai) => ai !== answerIndex) }
          : q,
      ),
    );
  }

  setAnswerText(questionIndex: number, answerIndex: number, value: string): void {
    this.questions.update((qs) =>
      qs.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              answers: q.answers.map((a, ai) =>
                ai === answerIndex ? { text: value } : a,
              ),
            }
          : q,
      ),
    );
  }

  /** Validates the form, persists the survey via the service, then shows the confirmation toast. */
  publish(): void {
    if (!this.isValid()) return;
    this.newSurveyId = this.surveyService.createSurvey({
      title: this.surveyTitle(),
      description: this.surveyDescription(),
      endDate: this.surveyEndDate(),
      tag: this.surveyTag() || 'Team Activities',
      questions: this.questions().map((q) => ({
        title: q.title,
        multiple: q.multiple,
        answers: q.answers.map((a) => a.text).filter((t) => t.trim() !== ''),
      })),
    });
    this.showConfirm.set(true);
  }

  /** Closes the confirmation toast and navigates to the newly created survey page. */
  confirmPublish(): void {
    this.showConfirm.set(false);
    this.router.navigate(['/survey', this.newSurveyId]);
  }
}
