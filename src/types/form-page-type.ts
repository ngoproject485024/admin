interface FormPageType {
  peTitle: string;
  enTitle: string;
  ruTitle: string;
  path: string;
  hasSubPage: boolean;
  hasSecondSubPage: boolean;
  template: number;
  subPage: {
    peTitle: string;
    enTitle: string;
    ruTitle: string;
    path: string;
    template: number;
  };
  secondSubPage: {
    peTitle: string;
    enTitle: string;
    ruTitle: string;
    path: string;
    template: number;
  };
}

export default FormPageType;
