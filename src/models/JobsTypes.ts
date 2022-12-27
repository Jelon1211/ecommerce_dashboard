export interface CheckedListItem {
  isChecked: boolean;
  id: number;
}

export interface IJobsresponse {
  _id: number;
  title: string;
  date: string;
  logo: string;
  shortdescription: string;
  longdescription: string;
  companyName: string;
  isChecked?: boolean;
}
