import React, { useState, useEffect } from 'react';
import { API, Storage } from "aws-amplify";
import { Link as RouterLink } from 'react-router-dom';
import UploadImage from '../components/UploadImage';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import './Home.css';

const useStyles = makeStyles(theme => ({
  root: {
  },
  card: {
    margin: '4px',
    height: '264px',
  },
  imageDate: {
    'padding-top': '32px',
  },
  image: {
    maxHeight: '100%',
    width: 'auto',
  },
  link: {
    margin: theme.spacing(1, 1.5),
    width: '120px'
  },
}))

function Home(props) {
  const classes = useStyles();

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getImages = () => {
      return API.get('images', '/images')
    }

    async function checkImages() {
      if (!props.authentication.isAuthenticated) {
        return;
      }

      try {
        let images = await getImages();

        const promises = images.map(async image => {
          return await Storage.vault.get(image.imageURL)
        });
        const imageSrcs = await Promise.all(promises);

        images = images.map((image, i) => {
          return { ...image, src: imageSrcs[i] }
        })

        setImages(images);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    checkImages();
  }, [props.authentication.isAuthenticated])

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

  const renderImageList = (images) => {
    return images.map((image, i) => {
      return (
        <Link component={RouterLink} key={image.imageId} to={`/images/${image.imageId}`}>
          <Card className={classes.card} key={image.imageId}>
            <CardMedia
              className={classes.image}
              component="img"
              image={image.src}
              title=""
            />
          </Card>
        </Link>
      )
    })

  }

  const renderImages = (images) => (
    <div className="images-container">
      {!isLoading && renderImageList(images)}

      <UploadImage />
    </div>
  )

  return (
    <div className="Home">
      {props.authentication.isAuthenticated ? renderImages(images) : renderLander()}
    </div>
  );
}

export default Home;