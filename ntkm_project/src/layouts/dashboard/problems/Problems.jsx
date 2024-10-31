import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider.jsx';
import { getProblems } from '../../../actions/problem.js';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import ProblemsActions from './ProblemsActions.jsx';

const Problems = ({ setSelectedLink, link }) => {
  const {
    state: { problems, currentUser},
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    setSelectedLink(link);
    if (problems.length === 0 && currentUser) getProblems(dispatch, currentUser);
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
        field: 'profile',
        headerName: 'Сотрудник',
        width: 200,
        renderCell: (params) =>
          (params.row.profile ? `${params.row.profile.last_name} ${params.row.profile.first_name} ${params.row.profile.second_name}` : ''),
        sortable: true,
        filterable: true,
      },
      {
        field: 'problem_status',
        headerName: 'Статус задачи',
        width: 170,
        type: 'singleSelect',
        valueOptions: [1, 2, 3, 4],
        renderCell: (params) =>
          (params.row.problem_status ? params.row.problem_status.problem_status_text : ''),
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'problem_type',
        headerName: 'Категория задачи',
        width: 170,
        renderCell: (params) =>
          (params.row.problem_type ? params.row.problem_type.problem_type_text : ''),
        sortable: true,
        filterable: true,
      },
      {
        field: 'object_of_work',
        headerName: 'Объект АСУТП',
        width: 170,
        renderCell: (params) =>
          (params.row.object_of_work ? params.row.object_of_work.object_of_work_text : ''),
        sortable: true,
        filterable: true,
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
        Задачи отдела
      </Typography>
      <DataGrid
        columns={columns}
        rows={problems}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[10, 15, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 10,
          bottom: params.isLastVisible ? 0 : 10,
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

export default Problems;
