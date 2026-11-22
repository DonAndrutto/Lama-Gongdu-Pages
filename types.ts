
export type Language = 'tib' | 'eng';

export interface Text {
  tib: string;
  eng: string;
  link?: string;
}

export interface Volume {
  volume_tib: string;
  volume_eng: string;
  short_desc: string;
  long_desc: string;
  texts: Text[];
}
