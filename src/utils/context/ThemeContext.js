import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: `'Cerebri Sans', sans-serif`,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '90%',
          marginBottom: '1em',
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& fieldset': {
              borderColor: 'var(--black)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--dark-grey)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--black)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'var(--brown)',
          },
          '& .MuiSelect-select': {
            color: 'var(--black)',
          },
          '& label.Mui-focused': {
            color: "var(--brown)"
          }
        },
      },
    },
  },
});

export default theme;