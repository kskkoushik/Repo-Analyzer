export interface FileContent {
  file_name: string;
  content: Vulnerability[];
}

export interface Vulnerability {
  vulnerability: string;
  suggestion: string;
  improved_code: string;
  rating: number;
}
