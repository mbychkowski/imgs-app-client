import React from 'react';
import { API } from "aws-amplify";
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Home.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    'max-width': '280px',
    'max-height': '100vh',
    display: 'flex',
    'flex-direction': 'column',
    'flex-wrap': 'wrap',
  },
  card: {
    margin: '12px',
  },
  newCard: {
    margin: '12px',
  },
  noteDate: {
    'padding-top': '32px',
  },
  link: {
    margin: theme.spacing(1, 1.5),
    width: '120px'
  },
}))

function Home(props) {
  const classes = useStyles();

  const renderLander = () => (
    <div className="lander">
      <h1>Lesser Images</h1>
      <p>Love it, Save it, Store it</p>
      <div>
        <Button component={RouterLink} to="/login" color="primary" variant="contained" className={classes.link}>
          Login
        </Button>
        <Button component={RouterLink} to="/signup" color="primary" variant="contained" className={classes.link}>
          Signup
        </Button>
      </div>
    </div>
  )

  return (
    <div className="Home">
      {renderLander()}
    </div>
  );
}

export default Home;