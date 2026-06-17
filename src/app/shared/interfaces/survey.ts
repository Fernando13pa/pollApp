export interface Survey {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly deadline: string;
  readonly endDate: string;
  readonly tag: string;
  readonly isUrgent: boolean;
  readonly progress: number;
  readonly status: 'active' | 'past';
  readonly questions: SurveyQuestion[];
}

export interface ResultOption {
  readonly label: string;
  readonly text: string;
  value: number;
}

export interface SurveyQuestion {
  readonly id: number;
  readonly title: string;
  readonly multiple: boolean;
  readonly options: ResultOption[];
}

export interface NewSurveyData {
  readonly title: string;
  readonly description: string;
  readonly endDate: string;
  readonly tag: string;
  readonly questions: NewQuestion[];
}

export interface NewQuestion {
  readonly title: string;
  readonly multiple: boolean;
  readonly answers: string[];
}
