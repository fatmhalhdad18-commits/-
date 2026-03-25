
export interface ChildAdvice {
  summary: string;
  immediateSteps: string[];
  managementStrategies: string[];
  expertTips: string[];
  warningSigns: string[];
}

export interface ConsultationData {
  age: string;
  ageUnit: 'days' | 'months' | 'years';
  problem: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
