import type { TranslationSection } from './types';

export const languagePromptSection = {
    language_prompt_title: {
        en: "Switch to {languageName}?",
        hi: "{languageName} में स्विच करें?",
        bn: "{languageName} এ পরিবর্তন করবেন?",
        mr: "{languageName} मध्ये बदलायचे आहे का?",
        te: "{languageName} కి మారాలా?",
    },
    language_prompt_message: {
        en: "It looks like you prefer {languageName}. Would you like to switch the language of the app?",
        hi: "ऐसा लगता है कि आप {languageName} पसंद करते हैं। क्या आप ऐप की भाषा बदलना चाहेंगे?",
        bn: "মনে হচ্ছে আপনি {languageName} পছন্দ করেন। আপনি কি অ্যাপের ভাষা পরিবর্তন করতে চান?",
        mr: "असे दिसते की तुम्हाला {languageName} आवडते. तुम्हाला अॅपची भाषा बदलायची आहे का?",
        te: "మీరు {languageName}ని ఇష్టపడుతున్నట్లు కనిపిస్తోంది. మీరు అనువర్తనం యొక్క భాషను మార్చాలనుకుంటున్నారా?",
    },
    language_prompt_no_thanks: {
        en: "No, Thanks",
        hi: "नहीं, धन्यवाद",
        bn: "না, ধন্যবাদ",
        mr: "नाही, धन्यवाद",
        te: "వద్దు, ధన్యవాదాలు",
    },
    language_prompt_translate: {
        en: "Translate to {languageName}",
        hi: "{languageName} में अनुवाद करें",
        bn: "{languageName} এ অনুবাদ করুন",
        mr: "{languageName} मध्ये अनुवाद करा",
        te: "{languageName}లోకి అనువదించండి",
    },
} satisfies TranslationSection;

