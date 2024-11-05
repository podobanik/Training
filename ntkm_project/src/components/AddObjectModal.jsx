import { Button, Dialog, DialogActions, DialogContent, Slide, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import AddUserForm from './UserApp/AddUserForm';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddObjectModal = ({openAddModal, setOpenAddModal, handleCloseAddModal, handleAdd, object}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    
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
            {"Вы действительно хотите удалить запись?"}
            </DialogTitle>
            <DialogContent>
                {object === 'user' &&
                    <AddUserForm listOfObjects={setOpenAddModal}/>
                }
                {object === 'problem' &&
                    <AddProblemForm listOfObjects={setOpenAddModal}/>
                }
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleCloseAddModal}>
                Отменить
            </Button>
            <Button onClick={handleAdd}>
                Сохранить
            </Button>
            </DialogActions>
    </Dialog>
    );
};

export default AddObjectModal;