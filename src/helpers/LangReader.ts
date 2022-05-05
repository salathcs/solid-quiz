import { getStringNoLocale, getStringWithLocale, Thing } from '@inrupt/solid-client';
import { MultiLangText } from '../models/MultiLangText';

export function getString(thing: Thing, propertyUri: string, multiLangSupport: boolean, lang: string): string {
    let str: string | null = null;

    if (multiLangSupport) {
        str = getStringWithLocale(thing, propertyUri, lang);
    }
    else{
        str = getStringNoLocale(thing, propertyUri);
    }

    return str ?? "error";
}

export function getMutliLang(thing: Thing, propertyUri: string, multiLangSupport: boolean, lang: string): MultiLangText {
    if (multiLangSupport) {
        const textEn = getStringWithLocale(thing, propertyUri, 'en') ?? "error";
        const textHu = getStringWithLocale(thing, propertyUri, 'hu') ?? "error";

        return { textEn, textHu };
    }
    else{
        const text = getStringNoLocale(thing, propertyUri) ?? "error";

        if (lang === 'hu') {
            return { textEn: "", textHu: text };
        }
        else{
            return { textEn: text, textHu: "" };
        }
    }
}
