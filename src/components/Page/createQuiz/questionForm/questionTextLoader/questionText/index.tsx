import React, { useCallback, useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Row, Col } from 'react-bootstrap';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { LangText } from './langText';
import { MonoText } from './monoText';

export const QuestionText: React.FC<Props> = ({ multiLang, onChange, defaultValue, defaultValueEn, defaultValueHu }) => {
	const { t, lang } = useContext(TranslateContext);

	const handleChange = useCallback((value: string) => {
		onChange((model) => {
			let rv = {
				...model
			};

			if (lang === 'hu'){
				rv.textHu = value;
			}
			else{
				rv.textEn = value;
			}

			return rv;
		});
	}, [lang, onChange]);

	const handleChangeEn = useCallback((value: string) => {
		onChange((model) => {
			return {
				...model,
				textEn: value
			};
		});
	}, [onChange]);

	const handleChangeHu = useCallback((value: string) => {
		onChange((model) => {
			return {
				...model,
				textHu: value
			};
		});
	}, [onChange]);

	const content = multiLang ? 
		<LangText 
			labelEn={t("createQuiz.question.textEn")} 
			labelHu={t("createQuiz.question.textHu")} 
			defaultValueEn={defaultValueEn}
			defaultValueHu={defaultValueHu}
			onChangeEn={handleChangeEn}
			onChangeHu={handleChangeHu} /> :
		<MonoText label={t("createQuiz.question.text")} defaultValue={defaultValue} onChange={handleChange} />

	return (
		<Row>
			<Col>
				{content}
			</Col>
		</Row>
	);
}