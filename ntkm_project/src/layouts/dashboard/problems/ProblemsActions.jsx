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

  const handleSubmit = async () => {
    setLoading(true);

    const { problem_status, problem_text, id, control_date } = params.row;
    const result = await updateProblemItem(
      { problem_status, problem_text, control_date },
      id,
      dispatch,
      currentUser
    );
    if (result) {
      setSuccess(true);
      setRowId(null);
      // const user = users.find(user=>user._id === _id)
      // user.role = role
      // user.active = active
      getProblems(dispatch, currentUser);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
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
          disabled={params.id !== rowId || loading}
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
