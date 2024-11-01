import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { getProblems, updateProblemItem } from '../../../actions/problem.js';
import { useValue } from '../../../context/ContextProvider.jsx';

const ProblemsActions = ({ params, rowId, setRowId }) => {
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  console.log(rowId);
  console.log(params);
  const handleSubmit = async () => {
    setLoading(true);

    const { problem_text, id, control_date, problem_type, object_of_work, user } = params.row;
    const result = await updateProblemItem(
      { problem_text, control_date, problem_type, object_of_work, user },
      id,
      dispatch,
      currentUser
    );
    if (result) {
      setSuccess(true);
      setRowId(null);
      getProblems(dispatch, currentUser);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.row.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.row.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default ProblemsActions;
