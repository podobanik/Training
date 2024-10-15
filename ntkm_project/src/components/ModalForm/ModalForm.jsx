import { useState} from "react";
import { Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import JournalForm from "../JournalForm/JournalForm.jsx";
import styles from './ModalForm.module.css';


const ModalForm = (props) => {
    const [visible, setVisible] = useState(false)

    var button = <Button onClick={() => toggle()} className={styles['button-edit']}>Редактировать</Button>;
    
    const toggle = () => {
        setVisible(!visible)
    };


    if (props.create) {
        button = (
            <Button
                className={styles['button-add']}
                onClick={() => toggle()}
                style={{minWidth: "200px"}}>
                + Добавить заметку
            </Button>
        )
    }

    return (
        <>
            {button}
            <Modal isOpen={visible} toggle={toggle}>
                <ModalHeader
                    style={{justifyContent: "center"}}>{props.create ? "Добавить заметку" : "Редактировать заметку"}</ModalHeader>
                <ModalBody>
                    <JournalForm
                        onSubmit={props.onSubmit}
                        newJournal={props.newJournal}
                        toggle={toggle}
                    />
                </ModalBody>
            </Modal>
        </>
    )
}
export default ModalForm;