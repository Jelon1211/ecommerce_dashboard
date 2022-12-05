export interface CheckedCandidatesListItem {
  isChecked: boolean;
  id: number;
}

export interface ICandidatesResponse {
  id: number;
  name: string;
  position: string;
  date: string;
  logo: string;
  shortDescription: string;
  longDescription: string;
  companyName: string;
  isChecked?: boolean;
}
