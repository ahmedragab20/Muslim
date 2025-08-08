export interface HijriDate {
  code: number;
  status: string;
  data: Data;
}

export interface Data {
  hijri: Hijri;
  gregorian: Gregorian;
}

export interface Hijri {
  date: string;
  format: string;
  day: string;
  weekday: Weekday;
  month: Month;
  year: string;
  designation: Designation;
  holidays: any[];
}

export interface Weekday {
  en: string;
  ar: string;
}

export interface Month {
  number: number;
  en: string;
  ar: string;
}

export interface Designation {
  abbreviated: string;
  expanded: string;
}

export interface Gregorian {
  date: string;
  format: string;
  day: string;
  weekday: Weekday2;
  month: Month2;
  year: string;
  designation: Designation2;
}

export interface Weekday2 {
  en: string;
}

export interface Month2 {
  number: number;
  en: string;
}

export interface Designation2 {
  abbreviated: string;
  expanded: string;
}

export interface FilteredHijriDate {
  day: Weekday;
  month: Month;
  year: string;
}
