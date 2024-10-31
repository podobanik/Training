import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { useValue } from '../../../context/ContextProvider';

function JournalForm({ onSubmit, data, onDelete }) {
	const {
    state: { userInfo }
  	} = useValue();
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const postRef = useRef();


	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		if (!data) {
			dispatchForm({ type: 'CLEAR' });
		}
		dispatchForm({ type: 'SET_VALUE', payload: { ...data }});
	}, [data]);

	useEffect(() => {
		let timerId;
		if (!isValid.post || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit, values, onSubmit]);

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value }});
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		dispatchForm({ type: 'CLEAR' });
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input appearence="title" type='text' ref={titleRef} onChange={onChange} value={values.title} name='title' isValid={!isValid.title}/>
				{data?.id && <button className={styles['delete']} type="button" onClick={deleteJournalItem}>
					<img src="/archive.svg" alt="Кнопка удалить" />
				</button>}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src='/folder.svg' alt='Иконка папки'/>
					<span>Метки</span>
				</label>
				<Input type='text' ref={tagRef} onChange={onChange} id="tag" value={values.tag} name='tag' isValid={!isValid.tag}/>
			</div>
			<textarea ref={postRef} name="post" id="" onChange={onChange} value={values.post} cols="30" rows="10" className={cn(styles['input'], {
				[styles['invalid']]: !isValid.post
			})}></textarea>
			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;