/**
 * This file is separate from the './i18n.ts' simply to make the Hot Module Replacement work seamlessly.
 * Your components can import this file in 'messages.ts' files which would ruin the HMR if this isn't a separate module
 */

interface Translations {
  [key: string]: string | Translations;
}

export const translations: Translations = {};

/*
 * Converts the static JSON file into an object where keys are identical
 * but values are strings concatenated according to syntax.
 * This is helpful when using the JSON file keys and still having the intellisense support
 * along with type-safety
 */
export const convertLanguageJsonToObject = (
  json: Record<string, any>,
  current?: string,
) => {
  Object.keys(json).forEach((key) => {
    const currentLookupKey = current ? `${current}.${key}` : key;
    if (typeof json[key] === "object") {
      translations[key] = {};
      convertLanguageJsonToObject(json[key], currentLookupKey);
    } else {
      translations[key] = currentLookupKey;
    }
  });
};
