export interface Source {
  id: string;
  sourcePath: string;
  contents: string;
  language: string;
}

export interface SourceRange {
  traceIndex: number;
  source: { id: string };
  start: {
    line: number;
    column: number;
  };
  end: {
    line: number | null;
    column: number | null;
  }
}
