export interface IModal {
  open: boolean;
  onClose: () => void;
  id?: number;
}

export interface SubmitJobsData {
  title: string;
  date: string;
  logo: string;
  shortdescription: string;
  longdescription: string;
}

export interface SubmitCandidatesData {
  name: string;
  position: string;
  date: string;
  logo: string;
  shortDescription: string;
  longDescription: string;
  companyName: string;
  id?: number;
}
