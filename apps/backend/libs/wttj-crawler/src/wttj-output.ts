export interface WttjOutput {
  reference: string;
  url: string;
  jobTitle: string;
  companyName: string;
  location: string;
  jobDescription: string;
  profileRequirements: string;
  company: Map<string, string>;
  job: Map<string, string>;
}
