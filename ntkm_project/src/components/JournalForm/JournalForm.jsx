import { useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';


function JournalForm( {onSubmit} ) {
    const [formValidState, setFormValidState] = useState({
        title: true,
        post: true,
        date:true
    })
    
    const addJournalItem = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        let isFormValid = true;
        if (!formProps.title?.trim().length) {
            setFormValidState(state => ({...state, title: false}));
            isFormValid = false;
        } else {
            setFormValidState(state => ({...state, title: true}));
        }
        if (!formProps.post?.trim().length) {
            setFormValidState(state => ({...state, post: false}));
            isFormValid = false;
        } else {
            setFormValidState(state => ({...state, post: true}));
        }
        if (!formProps.date.trim().length) {
            setFormValidState(state => ({...state, date: false}));
            isFormValid = false;
        } else {
            setFormValidState(state => ({...state, date: true}));
        }
        if (!isFormValid) {
            return;
        }
        
        onSubmit(formProps)
    }

  return (
    <>
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            <input type='title' name='title' className={cn(styles['input'], {
                [styles['invalid']]: !formValidState.title,
                // для примера, можно много условий (применяется если true)
                [styles['example']]: !formValidState.title
            })}/>
            <input type='date' name='date' className={cn(styles['input'], {
                [styles['invalid']]: !formValidState.date
            })}/>
            <textarea name='post' id='' cols='30' rows='10' className={cn(styles['input'], {
                [styles['invalid']]: !formValidState.post
            })}></textarea>
            <Button text='Сохранить'/>
        </form>
        
    </>
  );
}

export default JournalForm;