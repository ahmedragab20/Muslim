export interface Chapter {
  number: number;
  arabic: string;
  arabicWithTashkeel: string;
  english: string;
  englishTranslated: string;
}

export interface Verse {
  verse_key: string;
  verse_number: number;
  verse_arabic: string;
  verse_english: string;
  sajda: boolean;
}
