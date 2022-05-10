import React, { useCallback, useEffect, useState, useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { FloatingLabel, Form, Row, ToggleButton } from 'react-bootstrap';
import { TranslateContext } from '../../../../../contexts/TranslateContext';

export const QuizShareModalBody: React.FC<Props> = ({ friendList, setSelected }) => {
	const { t } = useContext(TranslateContext);
	const [elements, setElements] = useState<JSX.Element[]>([]);
	const [elementActive, setElementActive] = useState("");
	
	const onSelectChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setElementActive(event.target.value);
		setSelected(event.target.value);
	}, [setSelected]);
	
	const onSelectClick = useCallback((value: string) => {
		setElementActive(value);
		setSelected(value);
	}, [setSelected]);

	useEffect(() => {
		setElements(
			friendList.map((friend, indx) => 
				<Row key={"row" + indx} className='row-style'>
					<ToggleButton 
						key={"btnKey" + indx} 
						type="checkbox"
						variant="outline-dark" 
						checked={friend === elementActive}
        				value={friend}
						onChange={onSelectChange} 
						onClick={() => {onSelectClick(friend)}}>
							{friend}
					</ToggleButton>
				</Row>)
		);
	}, [friendList, elementActive, onSelectChange, onSelectClick]);

	return (
		<>			
			{elements}

			<FloatingLabel
				controlId="floatingInput"
				label={t("shareQuiz.modal.share.webid")}
				>
					<Form.Control type="text" placeholder={t("shareQuiz.modal.share.webid")} onChange={onSelectChange} value={elementActive} />				
			</FloatingLabel>
		</>
	);
}