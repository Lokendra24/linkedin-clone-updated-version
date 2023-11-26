import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function CircularProgressWithLabel(props) {
    // console.log(props.value)
  return (
    <Box sx={{ position: 'relative', display: 'flex',alignItems: 'center',justifyContent: 'center' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="primary">
          { props.value === 100 ? (<CheckCircleIcon fontSize='large' color='primary'  sx={{marginTop:'7px',marginLeft:'2px' }} />) : `${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({value}) {

  return <CircularProgressWithLabel value={value} />;
}
