import { Injectable, computed, signal } from '@angular/core';

import { NewQuestion, NewSurveyData, Survey, SurveyQuestion } from '../interfaces/survey';

function parseEndDate(endDate: string): number {
  const match = endDate.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (!match) return Infinity;
  return new Date(`${match[3]}-${match[2]}-${match[1]}`).getTime();
}

const TEAM_EVENT_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    title: 'Which date would work best for you?',
    multiple: true,
    options: [
      { label: 'A', text: '19.09.2025, Friday', value: 27 },
      { label: 'B', text: '10.10.2025, Friday', value: 44 },
      { label: 'C', text: '11.10.2025, Saturday', value: 3 },
      { label: 'D', text: '31.10.2025, Friday', value: 26 },
    ],
  },
  {
    id: 2,
    title: 'Choose the activities you prefer',
    multiple: true,
    options: [
      { label: 'A', text: 'Outdoor adventure like kayaking', value: 60 },
      { label: 'B', text: 'Office Costume Party', value: 0 },
      { label: 'C', text: 'Bowling, mini-golf, volleyball', value: 14 },
      { label: 'D', text: 'Beach party, Music & cocktails', value: 26 },
      { label: 'E', text: 'Escape room', value: 0 },
    ],
  },
  {
    id: 3,
    title: "What's most important to you in a team event?",
    multiple: true,
    options: [
      { label: 'A', text: 'Team bonding', value: 44 },
      { label: 'B', text: 'Food and drinks', value: 3 },
      { label: 'C', text: 'Trying something new', value: 26 },
      { label: 'D', text: 'Keeping it low-key and stress-free', value: 27 },
    ],
  },
  {
    id: 4,
    title: 'How long would you prefer the event to last?',
    multiple: true,
    options: [
      { label: 'A', text: 'Half a day', value: 14 },
      { label: 'B', text: 'Full day', value: 86 },
      { label: 'C', text: 'Evening only', value: 0 },
    ],
  },
];

const WELLNESS_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    title: 'Which wellness activity should we try first?',
    multiple: true,
    options: [
      { label: 'A', text: 'Morning stretching', value: 35 },
      { label: 'B', text: 'Healthy lunch club', value: 42 },
      { label: 'C', text: 'Walking meetings', value: 23 },
    ],
  },
  {
    id: 2,
    title: 'What time works best for wellness sessions?',
    multiple: true,
    options: [
      { label: 'A', text: 'Before work', value: 18 },
      { label: 'B', text: 'Lunch break', value: 57 },
      { label: 'C', text: 'After work', value: 25 },
    ],
  },
];

const GAMING_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    title: 'Which game night format sounds best?',
    multiple: true,
    options: [
      { label: 'A', text: 'Console tournament', value: 48 },
      { label: 'B', text: 'Co-op adventure', value: 32 },
      { label: 'C', text: 'Board game table', value: 20 },
    ],
  },
  {
    id: 2,
    title: 'How often should we host it?',
    multiple: true,
    options: [
      { label: 'A', text: 'Every Friday', value: 29 },
      { label: 'B', text: 'Twice a month', value: 51 },
      { label: 'C', text: 'Monthly', value: 20 },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class Surveys {
  readonly urgentSurveys = signal<Survey[]>([
    {
      id: 1,
      title: "Let's Plan the Next Team Event Together",
      description: 'We want to create team activities that everyone will enjoy - share your preferences and ideas in our survey to help us plan better experiences together.',
      deadline: 'Ends in 1 Day',
      endDate: 'Ends on 01.09.2025',
      tag: 'Team activities',
      isUrgent: true,
      progress: 82,
      status: 'active' as const,
      questions: TEAM_EVENT_QUESTIONS,
    },
    {
      id: 2,
      title: 'Fit & wellness survey!',
      description: 'Vote for habits and routines that support a healthier week.',
      deadline: 'Ends in 2 Days',
      endDate: 'Ends on 08.09.2025',
      tag: 'Health & Wellness',
      isUrgent: true,
      progress: 68,
      status: 'active' as const,
      questions: WELLNESS_QUESTIONS,
    },
    {
      id: 6,
      title: 'Gaming habits and favorite games!',
      description: 'Tell the team what you play and what should be next.',
      deadline: 'Ends in 3 Days',
      endDate: 'Ends on 11.09.2025',
      tag: 'Gaming & Entertainment',
      isUrgent: true,
      progress: 74,
      status: 'active' as const,
      questions: GAMING_QUESTIONS,
    },
  ]);

  readonly surveys = signal<Survey[]>([
    {
      id: 3,
      title: "Let's Plan the Next Team Event Together",
      description: 'We want to create team activities that everyone will enjoy - share your preferences and ideas in our survey to help us plan better experiences together.',
      deadline: 'Ends in 1 Day',
      endDate: 'Ends on 01.09.2025',
      tag: 'Team activities',
      isUrgent: false,
      progress: 54,
      status: 'active',
      questions: TEAM_EVENT_QUESTIONS,
    },
    {
      id: 4,
      title: 'Gaming habits and favorite games!',
      description: 'Tell the team what you play and what should be next.',
      deadline: 'Ends in 3 Days',
      endDate: 'Ends on 11.09.2025',
      tag: 'Gaming',
      isUrgent: false,
      progress: 39,
      status: 'active',
      questions: GAMING_QUESTIONS,
    },
    {
      id: 5,
      title: 'Healthier future: Fit & wellness survey!',
      description: 'Vote for habits and routines that support a healthier week.',
      deadline: 'Ends in 2 Days',
      endDate: 'Ends on 08.09.2025',
      tag: 'Healthy Lifestyle',
      isUrgent: false,
      progress: 72,
      status: 'active',
      questions: WELLNESS_QUESTIONS,
    },
    {
      id: 7,
      title: 'Workplace culture check-in',
      description: 'Share your thoughts on our office culture and how we can improve the work environment together.',
      deadline: 'Ends in 5 Days',
      endDate: 'Ends on 14.09.2025',
      tag: 'Workplace',
      isUrgent: false,
      progress: 64,
      status: 'active',
      questions: WELLNESS_QUESTIONS,
    },
    {
      id: 8,
      title: 'Remote work preferences',
      description: 'Help us shape our hybrid work policy by sharing what works best for you.',
      deadline: 'Ends in 7 Days',
      endDate: 'Ends on 16.09.2025',
      tag: 'Workplace',
      isUrgent: false,
      progress: 47,
      status: 'active',
      questions: TEAM_EVENT_QUESTIONS,
    },
    {
      id: 9,
      title: 'Q3 team retrospective',
      description: 'Reflect on the past quarter and share what went well and what we should improve.',
      deadline: 'Ends in 10 Days',
      endDate: 'Ends on 19.09.2025',
      tag: 'Team activities',
      isUrgent: false,
      progress: 79,
      status: 'active',
      questions: TEAM_EVENT_QUESTIONS,
    },
  ]);

  readonly pastSurveys = signal<Survey[]>([
    {
      id: 10,
      title: 'Summer office party planning',
      description: 'We asked the team to vote on the best options for our summer office party.',
      deadline: 'Ended',
      endDate: 'Ended on 15.07.2025',
      tag: 'Team activities',
      isUrgent: false,
      progress: 100,
      status: 'past',
      questions: TEAM_EVENT_QUESTIONS,
    },
    {
      id: 11,
      title: 'Onboarding process feedback',
      description: 'New team members shared their experience with our onboarding process.',
      deadline: 'Ended',
      endDate: 'Ended on 30.06.2025',
      tag: 'Workplace',
      isUrgent: false,
      progress: 100,
      status: 'past',
      questions: WELLNESS_QUESTIONS,
    },
    {
      id: 12,
      title: 'Q2 team retrospective',
      description: 'Feedback collected from the team on Q2 progress and areas for improvement.',
      deadline: 'Ended',
      endDate: 'Ended on 01.07.2025',
      tag: 'Team activities',
      isUrgent: false,
      progress: 100,
      status: 'past',
      questions: GAMING_QUESTIONS,
    },
  ]);

  readonly sortedUrgentSurveys = computed(() =>
    [...this.urgentSurveys()].sort((a, b) => parseEndDate(a.endDate) - parseEndDate(b.endDate))
  );

  /** Returns a survey by ID, falling back to the first active survey if not found. */
  getSurveyById(id: number): Survey {
    const all = [...this.urgentSurveys(), ...this.surveys(), ...this.pastSurveys()];
    return all.find((survey) => survey.id === id) ?? this.surveys()[0];
  }

  readonly votedSurveyIds = signal<Set<number>>(new Set());

  markVoted(surveyId: number): void {
    this.votedSurveyIds.update((set) => new Set([...set, surveyId]));
  }

  /** Applies the submitted votes to both urgent and active survey signals. */
  vote(surveyId: number, votes: Map<number, string[]>): void {
    this.urgentSurveys.update((list) => this.applyVotes(list, surveyId, votes));
    this.surveys.update((list) => this.applyVotes(list, surveyId, votes));
  }

  /** Creates a new survey from the given form data and returns its generated ID. */
  createSurvey(data: NewSurveyData): number {
    const newId = this.generateId();
    this.surveys.update((s) => [this.buildSurvey(newId, data), ...s]);
    return newId;
  }

  private applyVotes(list: Survey[], surveyId: number, votes: Map<number, string[]>): Survey[] {
    return list.map((s) => (s.id !== surveyId ? s : this.updateSurveyVotes(s, votes)));
  }

  private updateSurveyVotes(survey: Survey, votes: Map<number, string[]>): Survey {
    return {
      ...survey,
      questions: survey.questions.map((q) => this.updateQuestionVotes(q, votes.get(q.id) ?? [])),
    };
  }

  private updateQuestionVotes(question: SurveyQuestion, selected: string[]): SurveyQuestion {
    return {
      ...question,
      options: question.options.map((o) => ({
        ...o,
        value: selected.includes(o.label) ? o.value + 1 : o.value,
      })),
    };
  }

  private generateId(): number {
    const allIds = [...this.urgentSurveys(), ...this.surveys(), ...this.pastSurveys()].map((s) => s.id);
    return allIds.length > 0 ? Math.max(...allIds) + 1 : 1;
  }

  private buildSurvey(id: number, data: NewSurveyData): Survey {
    return {
      id,
      title: data.title,
      description: data.description,
      deadline: data.endDate ? `Ends on ${data.endDate}` : 'No deadline',
      endDate: data.endDate ? `Ends on ${data.endDate}` : 'No deadline',
      tag: data.tag || 'General',
      isUrgent: false,
      progress: 0,
      status: 'active',
      questions: data.questions.map((q, qIdx) => this.buildQuestion(q, qIdx)),
    };
  }

  private buildQuestion(q: NewQuestion, index: number): SurveyQuestion {
    return {
      id: index + 1,
      title: q.title,
      multiple: q.multiple,
      options: q.answers
        .filter((a) => a.trim() !== '')
        .map((a, aIdx) => ({ label: String.fromCharCode(65 + aIdx), text: a, value: 0 })),
    };
  }
}
