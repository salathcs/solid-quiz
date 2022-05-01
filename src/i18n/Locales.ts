import en from './en.json'
import hu from './hu.json'

export const isSupportedLanguage = (language: string): boolean => {
    return language === 'hu' ||
        language === 'en';
}

export const translate = (key: string, language: string): string => {
    let languageFile: { [key: string]: string } = {};

    if (language === 'hu') {
        languageFile = hu;
    }
    else{
        languageFile = en;
    }

    return languageFile[key];
}