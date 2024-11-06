import { Button, Dialog, DialogActions, DialogContent, MenuItem, Slide, DialogTitle, useMediaQuery, useTheme, TextField, Input, Switch, FormGroup, FormControlLabel } from '@mui/material';
import { forwardRef, useRef, useState } from 'react';
import { useValue } from '../../../context/ContextProvider';


import { addProblemItem } from '../../actions/problem';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddObjectProblemModal = ({openAddModal, setOpenAddModal, handleCloseAddModal}) => {
    const problemTextRef = useRef();
    const controlDateRef = useRef();
    const userRef = useRef();
    const problemTypeRef = useRef();
    const problemStatusRef = useRef();
    const objectOfWorkRef = useRef();
    const fileRef = useRef();
    const {
    dispatch,
    state: { currentUser, problem_status_all, objects_of_work, problem_type_all },
  } = useValue()
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleSelectFiles = (e) => {
        setSelectedFiles(e.target.files)
    }
    
    const submitDataAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFiles);
        const file = formData;
        const problem_text = problemTextRef.current.value;
        const problem_status = problemStatusRef.current.value;
        const problem_type = problemTypeRef.current.value;
        const user = userRef.current.value;
        const object_of_work = objectOfWorkRef.current.value;
        const control_date = controlDateRef.current.value;
        
        const addFields = {
                problem_text: problem_text,
                user: user,
                problem_status: problem_status,
                problem_type: problem_type,
                object_of_work: object_of_work,
                control_date: control_date,
                file: file
            }
        
            const add = await addProblemItem(
                addFields,
                dispatch,
                currentUser
            );
            if (add) {
                setOpenAddModal(false)
                getUsers(dispatch, currentUser);
            }
        };
    };


    return (
    <Dialog
        fullScreen={fullScreen}
        open={openAddModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAddModal}
        aria-labelledby="responsive-dialog-title"
    >
            <DialogTitle id="responsive-dialog-title">
            {"Заполните форму ниже:"}
            </DialogTitle>
            <form onSubmit={submitDataAdd}>
                <DialogContent dividers>
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="email"
                    label="Адрес электронной почты"
                    type="email"
                    fullWidth
                    inputRef={emailRef}
                    required
                />
                <PasswordField {...{ passwordRef }} />
                <PasswordField
                    passwordRef={confirmPasswordRef}
                    id="confirmPassword"
                    label="Подтвердите пароль"
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="username"
                    label="Логин"
                    type="text"
                    fullWidth
                    inputRef={usernameRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="last_name"
                    label="Фамилия"
                    type="text"
                    fullWidth
                    inputRef={lastNameRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="last_name"
                    label="Имя"
                    type="text"
                    fullWidth
                    inputRef={firstNameRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="second_name"
                    label="Отчество"
                    type="text"
                    fullWidth
                    inputRef={secondNameRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="title"
                    label="Должность"
                    type="text"
                    fullWidth
                    inputRef={titleRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="birthday"
                    helperText="День рождения"
                    type="date"
                    fullWidth
                    inputRef={birthdayRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="birthday"
                    label="Сектор сотрудника"
                    select
                    fullWidth
                    inputRef={sectorRef}
                    required
                    helperText="Выберите сектор из списка"
                    defaultValue=""
                >
                    {sectors.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.sector_text}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="phone"
                    label="Номер телефона"
                    type="text"
                    fullWidth
                    inputRef={phoneRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="photoURL"
                    type="file"
                    fullWidth
                    helperText="Фото сотрудника"    
                    onChange={handleChangePhoto}     
                    accept="image/*,"        
                />
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch 
                        checked={checkedActive}
                        onChange={handleChangeActive}
                        name="is_active"
                        inputRef={isActiveRef}
                        />
                    }
                    label="Активный пользователь"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch 
                        checked={checkedStaff}
                        onChange={handleChangeStaff}
                        name="is_staff"
                        inputRef={isStaffRef}
                        />
                    }
                    label="Доступ к админке"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch 
                        checked={checkedSuperuser}
                        onChange={handleChangeSuperuser}
                        name="is_superuser"
                        inputRef={isSuperuserRef}
                        />
                    }
                    label="Суперпользователь"
                    />
                </FormGroup>
                </DialogContent>
                <DialogActions sx={{ px: '19px' }}>
                <Button type="submit" variant="contained">
                    Сохранить
                </Button>
                <Button onClick={handleCloseAddModal}>
                    Отменить
                </Button>
            </DialogActions>
            </form>
    </Dialog>
    );

};

export default AddObjectProblemModal;