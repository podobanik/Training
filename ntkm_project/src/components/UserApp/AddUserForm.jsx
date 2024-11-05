import {useRef, useState} from "react";
import {Form, Button} from 'react-bootstrap';
import { useValue } from '../../context/ContextProvider';
import { getUsers } from '../../actions/user';
import { register } from '../../actions/user';
import PasswordField from './user/PasswordField';


const AddUserForm = ({setOpenModal}) => {
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [object, setObject] = useState({})
    const {
    dispatch,
    state: { currentUser },
  } = useValue();

    const onChange = (e) => {
        const newState = object
        newState[e.target.name] = e.target.value
        setObject(newState)
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const defaultIfEmpty = value => {
        return value === "" ? "" : value;
    }
    
    
    const submitDataAdd = async (e) => {
        e.preventDefault();
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if (password !== confirmPassword) {
            return dispatch({
            type: 'UPDATE_ALERT',
            payload: {
            open: true,
            severity: 'error',
            message: 'Пароли не совпадают',
            },
            });
        }else {
            const addFields = {
                email: object['email'],
                username: object['username'],
                password: password,
                is_active: object['is_active'],
                is_staff: object['is_staff'],
                is_superuser: object['is_superuser'],
                profile: {
                    last_name: object['last_name'],
                    first_name: object['first_name'],
                    second_name: object['second_name'],
                    title: object['title'],
                    sector: object['sector'],
                    birthday: object['birthday'],
                    photoURL: object['photoURL'],
                    phone: object['phone']
                }

            }
        
            const add = await register(
                addFields,
                dispatch,
                currentUser
            );
            if (add) {
                setOpenModal(false)
                getUsers(dispatch, currentUser);
            }
        };
        
    


    return (
        <Form onSubmit={submitDataAdd}>
            <Form.Group className='mb-3' controlId='emailControl'>
                <Form.Label for="email">Адрес электронной почты:</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(object.email)}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='userControl'>
                <Form.Label for="username">
                    Логин
                </Form.Label>
                <Form.Control
                    name="username"
                    type="text"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(object.username)}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='passwordControl'>
                <PasswordField {...{ passwordRef }} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='confirmPasswordControl'>  
                <PasswordField
                    passwordRef={confirmPasswordRef}
                    id="confirmPassword"
                    label="Подтвердите пароль"
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='lastNameControl'>
                <Form.Label for="last_name">
                    Фамилия
                </Form.Label>
                <Form.Control
                    name="last_name"
                    type="text"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(object.last_name)}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='firstNameControl'>
                <Form.Label for="first_name">
                    Имя
                </Form.Label>
                <Form.Control
                    name="first_name"
                    type="text"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(object.first_name)}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='secondNameControl'>
                <Form.Label for="second_name">
                    Отчество
                </Form.Label>
                <Form.Control
                    name="second_name"
                    type="text"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(object.second_name)}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='titleControl'>
                <Form.Label for="title">
                    Должность
                </Form.Label>
                <Form.Control
                    name="title"
                    type="text"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(object.title)}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='phoneControl'>
                <Form.Label for="phone">
                    Телефон
                </Form.Label>
                <Form.Control
                    name="phone"
                    type="text"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(object.phone)}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='birthdayControl'>
                <Form.Label for="birthday">
                    День рождения
                </Form.Label>
                <Form.Control
                    name="birthday"
                    type="date"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(object.birthday)}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='sectorControl'>
                <Form.Select aria-label="Сектор сотрудника" name='sector'>
                <option>Выберите сектор сотрудника</option>
                {sectors?.map((sector) => <option key={sector.id} value={sector.id} onChange={onChange}>{sector.sector_text}</option>)}
            </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3' controlId='isActiveControl'>
                <Form.Check // prettier-ignore
                    type="switch"
                    name="is_active"
                    label="Активный пользователь"
                    onChange={onChange}
                    value={!object.is_active}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='isStaffControl'>
                <Form.Check // prettier-ignore
                    type="switch"
                    name="is_staff"
                    label="Доступ к админке"
                    onChange={onChange}
                    value={!object.is_staff}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='isSuperuserControl'>
                <Form.Check // prettier-ignore
                    type="switch"
                    name="is_superuser"
                    label="Администратор"
                    onChange={onChange}
                    value={!object.is_superuser}
                />
            </Form.Group>
            <div>
                <Button>Подтвердить</Button> <Button onClick={handleClose}>Отменить</Button>
            </div>
        </Form>
    )
};
};
export default AddUserForm;