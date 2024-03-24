import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import { convertLanguageJsonToObject } from "./locales/translation.ts";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: en,
};

convertLanguageJsonToObject(en);

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
