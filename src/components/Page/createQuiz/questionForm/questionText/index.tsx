import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Row, Col } from 'react-bootstrap';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import { LangText } from './langText';
import { MonoText } from './monoText';

export const QuestionText: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);
	const [defaultValue] = useState("");
	
	const handleChange = (value: string) => {
		props.onChange((model) => {
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
	};

	const handleChangeEn = (value: string) => {
		props.onChange((model) => {
			return {
				...model,
				textEn: value
			};
		});
	};

	const handleChangeHu = (value: string) => {
		props.onChange((model) => {
			return {
				...model,
				textHu: value
			};
		});
	};

	const content = props.multiLang ? 
		<LangText 
			labelEn={t("createQuiz.question.textEn")} 
			labelHu={t("createQuiz.question.textHu")} 
			defaultValueEn={defaultValue}
			defaultValueHu={defaultValue}
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