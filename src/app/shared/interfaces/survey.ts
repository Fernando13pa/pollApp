export interface Survey {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly deadline: string;
  readonly tag: string;
  readonly isUrgent: boolean;
  readonly progress: number;
}

export interface ResultOption {
  readonly label: string;
  readonly value: number;
}
