import React, { useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { defaultTranslateState, TranslateContext } from '../../../contexts/TranslateContext';
import { isSupportedLanguage, translate } from '../../../i18n/Locales';
import { LanguageSelector } from './languageSelector';

export const TranslateContextComponent: React.FC<Props> = (props: Props) => {
	const [lang, setLang] = useState(defaultTranslateState.lang);

	useEffect(() => {
		var userLang = navigator.language;
		if (userLang && isSupportedLanguage(userLang)) {
			setLang(userLang);
		}
	  }, []);

	const t = (key: string) => {
		return translate(key, lang);
	}

	const changeLang = (language: string) => {
		setLang(language);
	}

	return (
		<TranslateContext.Provider value={{
			lang,
			t
		}}>
			<LanguageSelector changeLang={changeLang} />
			{props.children}
		</TranslateContext.Provider>
	);
}