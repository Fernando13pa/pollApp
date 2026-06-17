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

  protected readonly surveyTitle = signal('');
  protected readonly surveyDescription = signal('');
  protected readonly surveyEndDate = signal('');
  protected readonly surveyTag = signal('General');
  protected readonly showConfirm = signal(false);
  private newSurveyId: number = 0;

  protected readonly CATEGORIES = [
    'General',
    'Team activities',
    'Workplace',
    'HR',
    'IT',
    'Onboarding',
    'Feedback',
  ] as const;

  protected readonly questions = signal<DraftQuestion[]>([
    { title: '', multiple: false, answers: [{ text: '' }, { text: '' }] },
  ]);

  /** True when the title is filled and every question has a title plus at least two answers. */
  protected readonly isValid = computed(() => {
    const titleOk = this.surveyTitle().trim() !== '';
    const questionsOk = this.questions().every(
      (q) =>
        q.title.trim() !== '' &&
        q.answers.filter((a) => a.text.trim() !== '').length >= 2,
    );
    return titleOk && this.questions().length > 0 && questionsOk;
  });

  protected getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /** Appends a new blank question with two empty answer slots to the draft. */
  protected addQuestion(): void {
    this.questions.update((qs) => [
      ...qs,
      { title: '', multiple: false, answers: [{ text: '' }, { text: '' }] },
    ]);
  }

  /** Resets question 0 to blank; removes any other question by index. */
  protected removeQuestion(index: number): void {
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

  protected setQuestionTitle(index: number, value: string): void {
    this.questions.update((qs) =>
      qs.map((q, i) => (i === index ? { ...q, title: value } : q)),
    );
  }

  protected setQuestionMultiple(index: number, checked: boolean): void {
    this.questions.update((qs) =>
      qs.map((q, i) => (i === index ? { ...q, multiple: checked } : q)),
    );
  }

  protected addAnswer(questionIndex: number): void {
    this.questions.update((qs) =>
      qs.map((q, i) =>
        i === questionIndex ? { ...q, answers: [...q.answers, { text: '' }] } : q,
      ),
    );
  }

  protected removeAnswer(questionIndex: number, answerIndex: number): void {
    this.questions.update((qs) =>
      qs.map((q, i) =>
        i === questionIndex
          ? { ...q, answers: q.answers.filter((_, ai) => ai !== answerIndex) }
          : q,
      ),
    );
  }

  protected setAnswerText(questionIndex: number, answerIndex: number, value: string): void {
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
  protected publish(): void {
    if (!this.isValid()) return;
    this.newSurveyId = this.surveyService.createSurvey({
      title: this.surveyTitle(),
      description: this.surveyDescription(),
      endDate: this.surveyEndDate(),
      tag: this.surveyTag(),
      questions: this.questions().map((q) => ({
        title: q.title,
        multiple: q.multiple,
        answers: q.answers.map((a) => a.text).filter((t) => t.trim() !== ''),
      })),
    });
    this.showConfirm.set(true);
  }

  /** Closes the confirmation toast and navigates to the newly created survey page. */
  protected confirmPublish(): void {
    this.showConfirm.set(false);
    this.router.navigate(['/survey', this.newSurveyId]);
  }
}
