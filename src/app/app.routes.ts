import { Routes } from '@angular/router';

import { CreateSurvey } from './shared/components/create-survey/create-survey';
import { Home } from './shared/components/home/home';
import { SurveyDetail } from './shared/components/survey-detail/survey-detail';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'create',
    component: CreateSurvey,
  },
  {
    path: 'survey/:id',
    component: SurveyDetail,
  },
];
