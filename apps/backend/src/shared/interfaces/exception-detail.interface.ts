export interface ExceptionDetail {
  property?: string;
  children?: any[];
  constraints?: { [key: string]: string };
}
