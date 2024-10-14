import {useState} from "react";
import {Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import JournalForm from "../JournalForm/JournalForm.jsx";
import styles from './ModalForm.module.css';

const ModalForm = ({onSubmit}) => {
    const [visible, setVisible] = useState(false)
    
    const toggle = () => {
        setVisible(!visible)
    }

    return (
        <Fragment>
            <Modal isOpen={visible} toggle={toggle}>
                <ModalHeader
                    style={{justifyContent: "center"}}>Добавить задачу</ModalHeader>
                <ModalBody>
                    <JournalForm
                        onSubmit={onSubmit}
                        toggle={toggle}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
    )
}
export default ModalForm;