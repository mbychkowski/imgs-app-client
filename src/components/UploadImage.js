import React, {useState} from 'react';
import { API } from 'aws-amplify';
import { s3Upload } from '../libs/awsLib';
import config from '../config';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  },
  button: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),  
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  fabContainer: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }, 
  fab: {
    margin: '0 8px',
    maxWidth: '36px',
    maxHeight: '36px',
  },
  card: {
    maxWidth: 345,
  },
}));

function UploadImage(props) {
  const classes = useStyles();

  const [file, setFile] = useState(null);
  const [objURL, setObjectURL] = useState(null);
  const [open, setOpen] = useState(false);

  const createImage = (image) => {
    return API.post('images', '/images', {
      body: image
    });
  }

  const handleAccept = async event => {
    if (file && file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
      return;
    }

    // create image
    try {
      const imageURL = file ? await s3Upload(file) : null;

      await createImage({
        imageURL,
      });
    } catch(e) {
      alert(e)
    }

    setFile(null);
    setOpen(false);
  }

  const handleClose = () => {
    setFile(null);
    setOpen(false);
  }

  const handleFileChange = event => {
    const { files } = event.target

    if (files.length > 0) {
      setFile(files[0]);
      setOpen(true);
      setObjectURL(URL.createObjectURL(files[0]))
    }
  }

  const handleDecline = event => {
    setFile(null);
    setOpen(false);
  }

  return (
    <form>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
      
        <Button variant="contained" color="default" component="span" className={classes.button}>
          {file ? file.name : 'UPLOAD'}
          <CloudUploadIcon
            className={classes.rightIcon} />
        </Button>

      <Dialog
        aria-labelledby="imple-dialog-title"
        open={open}
        onClose={handleClose}
      >
        <Card>
          <CardMedia 
            component="img"
            alt="Selection"
            image={objURL}
            title=""
        />
        <div className={classes.fabContainer}>
          <Fab color="secondary" aria-label="Decline" className={classes.fab} onClick={handleDecline}>
            <CloseIcon />
          </Fab>
          <Fab color="primary" aria-label="Confirm" className={classes.fab} onClick={handleAccept} >
            <DoneIcon />
          </Fab>        
        </div>
        </Card>
      </Dialog>

      </label>
    </form>
  )
}

export default UploadImage;