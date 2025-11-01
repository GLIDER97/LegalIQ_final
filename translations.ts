import { LANGUAGES as SUPPORTED_LANGUAGES, type Language, type TranslationSection } from './translations/types';
import { commonTranslations } from './translations/common';
import { emotionalCopy } from './translations/emotionalCopy';
import { trustSection } from './translations/trust';
import { testimonialsSection } from './translations/testimonials';
import { useCasesSection } from './translations/useCases';
import { faqSection } from './translations/faq';
import { languagePromptSection } from './translations/languagePrompt';
import { blogContentSection } from './translations/blogContent';
import { aiLegalSupportSection } from './translations/aiLegalSupport';
import { aiFeaturesSection } from './translations/aiFeatures';

export { LANGUAGES } from './translations/types';
export type { Language } from './translations/types';

export const combinedTranslations = {
    ...commonTranslations,
    ...emotionalCopy,
    ...trustSection,
    ...testimonialsSection,
    ...useCasesSection,
    ...faqSection,
    ...languagePromptSection,
    ...blogContentSection,
    ...aiLegalSupportSection,
    ...aiFeaturesSection,
} satisfies TranslationSection;

export type TranslationKeys = keyof typeof combinedTranslations;

export const translations = SUPPORTED_LANGUAGES.reduce(
    (acc, lang) => {
        acc[lang] = {} as Record<TranslationKeys, string>;
        for (const key in combinedTranslations) {
            const typedKey = key as TranslationKeys;
            acc[lang][typedKey] = combinedTranslations[typedKey][lang];
        }
        return acc;
    },
    {} as Record<Language, Record<TranslationKeys, string>>
);


