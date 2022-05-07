import React, { useCallback, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { FloatingLabel, Form, Row, ToggleButton } from 'react-bootstrap';

export const QuizShareModalBody: React.FC<Props> = ({ friendList, setSelected }) => {
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
				label={"asd"}
				>
					<Form.Control type="text" placeholder={"asd"} onChange={onSelectChange} value={elementActive} />				
			</FloatingLabel>
		</>
	);
}