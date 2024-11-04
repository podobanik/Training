import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider.jsx';
import { getProblems } from '../../../actions/problem.js';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import ProblemsActions from './ProblemsActions.jsx';
import { getStatuses } from '../../../actions/problem_status.js';
import { getUsers } from '../../../actions/user.js';
import { ruRU } from '@mui/material/locale';

const Problems = ({ setSelectedLink, link }) => {
  const {
    state: { problems, problem_status_all, users, currentUser},
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    setSelectedLink(link);
    if (problems.length === 0 && currentUser) getProblems(dispatch, currentUser);
    if (problem_status_all.length === 0 && currentUser) getStatuses(dispatch, currentUser);
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
        field: 'problem_text',
        headerName: 'Краткое описание задачи',
        width: 300,
        type: 'text',
        renderCell: (params) =>
          (params.row.problem_text),
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'user',
        headerName: 'Сотрудник',
        width: 200,
        renderCell: (params) =>
          (params.row.user?.profile ? `${params.row.user.profile.last_name} ${params.row.user.profile.first_name} ${params.row.user.profile.second_name}` : ''),
        sortable: true,
        filterable: true,
      },
      {
        field: 'problem_status',
        headerName: 'Статус задачи',
        width: 170,
        renderCell: (params) => 
          (params.row.problem_status?.problem_status_text),
        sortable: true,
        filterable: true,
      },
      {
        field: 'problem_type',
        headerName: 'Категория задачи',
        width: 170,
        type: 'text',
        renderCell: (params) =>
          (params.row.problem_type),
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'object_of_work',
        headerName: 'Объект АСУТП',
        width: 170,
        type: 'text',
        renderCell: (params) =>
          (params.row.object_of_work),
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'control_date',
        headerName: 'Контрольный срок',
        width: 200,
        renderCell: (params) =>
          moment(params.row.control_date).format('DD.MM.YYYY'),
        sortable: true,
        filterable:true,
      },
      {
        field: 'change_date',
        headerName: 'Дата изменения',
        width: 200,
        renderCell: (params) =>
          moment(params.row.change_date).format('DD.MM.YYYY HH:MM'),
        sortable: true,
        filterable:true,
      },
      {
        field: 'actions',
        headerName: 'Действия',
        type: 'actions',
        renderCell: (params) => (
          <ProblemsActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId, users]
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
        Задачи отдела
      </Typography>
      <DataGrid
        columns={columns}
        rows={problems}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        localeText={ruRU}
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
        onCellClick={(params) => setRowId(params.row.id)}
      />
    </Box>
  );
};

export default Problems;
