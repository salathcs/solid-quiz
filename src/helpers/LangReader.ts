import { getStringNoLocale, getStringWithLocale, Thing } from '@inrupt/solid-client';

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