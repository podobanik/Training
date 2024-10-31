import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider.jsx';
import { getUsers } from '../../../actions/user.js';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import UsersActions from './UsersActions.jsx';

const Users = ({ setSelectedLink, link }) => {
  const {
    state: { users, currentUser},
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    setSelectedLink(link);
    if (users.length === 0 && currentUser) getUsers(dispatch, currentUser);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '№',
        width:40,
        sortable: true,
        filterable: true,
      },
      {
        field: 'photoURL',
        headerName: 'Фото',
        width: 60,
        renderCell: (params) => {
          params.row.profile ? 
          <Avatar src={params.row.profile.photoURL} /> 
          : <Avatar src={'http://localhost:8000/images/profile.jpeg'} />
        },
        sortable: false,
        filterable: false,
      },
      {
        field: 'username',
        headerName: 'Логин',
        width: 170,
        type: 'text',
        renderCell: (params) =>
          (params.row.username),
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'email',
        headerName: 'Адрес электронной почты',
        width: 200,
        renderCell: (params) =>
          (params.row.email),
        sortable: true,
        filterable: true,
      },
      {
        field: 'name',
        headerName: 'ФИО',
        width: 300,
        type: 'text',
        renderCell: (params) =>
          (params.row.profile ? `${params.row.profile.last_name} ${params.row.profile.first_name} ${params.row.profile.second_name}` : ''),
        sortable: true,
        filterable: true,
      },
      {
        field: 'is_superuser',
        headerName: 'Администратор',
        width: 100,
        type: 'singleSelect',
        valueOptions: [true, false],
        renderCell: (params) =>
          (params.row.is_superuser ? 'Да' : 'Нет'),
        editable: true,
      },
      {
        field: 'date_joined',
        headerName: 'Дата создания',
        width: 200,
        renderCell: (params) =>
          moment(params.row.date_joined).format('DD.MM.YYYY HH:MM'),
      },
      {
        field: 'actions',
        headerName: 'Действия',
        type: 'actions',
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Список сотрудников
      </Typography>
      <DataGrid
        columns={columns}
        rows={users}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
};

export default Users;
