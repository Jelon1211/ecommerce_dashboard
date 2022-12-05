export interface CheckedListItem {
  isChecked: boolean;
  id: number;
}

export interface IJobsresponse {
  id: number;
  title: string;
  date: string;
  logo: string;
  shortDescription: string;
  longDescription: string;
  companyName: string;
  isChecked?: boolean;
}
