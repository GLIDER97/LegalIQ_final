export type Language = 'en' | 'hi' | 'bn' | 'mr' | 'te';

export const LANGUAGES = ['en', 'hi', 'bn', 'mr', 'te'] as const;

export type TranslationSection = Record<string, Record<Language, string>>;

