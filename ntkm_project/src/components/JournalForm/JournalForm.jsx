import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { Form, FormGroup, Input, Label} from "reactstrap";


function JournalForm( props ) {
    const [formValidState, setFormValidState] = useState({
        title: true,
        post: true,
        date: true
    });

    const [journal, setJournal] = useState({});

    useEffect(() => {
        if (!props.newJournal) {
            setJournal(props.journal)
        }  
    }, [props.journal])


    const defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    const onChange = (e) => {
        const newState = journal
        newState[e.target.name] = e.target.value
        setJournal(newState)
    }
    
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
        
        props.onSubmit(formProps);
        props.toggle();
    }

    const editJournalItem = (e) => {
        e.preventDefault();
        const formData = new FormData(journal);
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
        
        props.onSubmit(formProps);
        props.toggle();
    }

  return (
    <>
        <Form onSubmit={props.newJournal ? addJournalItem : editJournalItem} className={styles['journal-form']}>
            <FormGroup>
                <Label for="title">Название заметки:</Label>
                <Input
                    type="title"
                    name="title"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(journal.title)}
                    className={cn(styles['input'], {
                        [styles['invalid']]: !formValidState.title
                })}/>
            </FormGroup>
            <FormGroup>
                <Label for="date">Дата создания:</Label>
                <Input
                    type="date"
                    name="date"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(journal.date)}
                    className={cn(styles['input'], {
                        [styles['invalid']]: !formValidState.date
                })}/>
            </FormGroup>
            <FormGroup>
                <Label for="post">Текст заметки:</Label>
                <Input
                    type="textarea"
                    name="post"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(journal.post)}
                    className={cn(styles['input'], {
                        [styles['invalid']]: !formValidState.post
                })}/>
            </FormGroup>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button text={'Подтвердить'}/> <Button onClick={props.toggle} text={'Отменить'}/>
            </div>
        </Form>
    </>
  );
}

export default JournalForm;
