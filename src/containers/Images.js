import React, { useState, useEffect } from 'react'
import { API, Storage } from "aws-amplify";
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import './Images.css';

const useStyles = makeStyles(theme => ({
  card: {
    height: '80%',
  },
  image: {
    maxHeight: '100%',
    width: 'auto',
  },
}))

function Images(props) {
  const classes = useStyles();

  const [image, setImage] = useState(null);

  useEffect(() => {
    const getImage = () => {
      return API.get('images', `/images/${props.match.params.id}`)
    }

    async function checkImage() {
      try {
        const image = await getImage();
        const imageSrc = await Storage.vault.get(image.imageURL);

        setImage({ ...image, src: imageSrc })
      } catch (e) {
        alert(e)
      }
    }

    checkImage()
  }, [props.match.params.id])

  return (
    <div className="Images">
      {image &&
        <Card className={classes.card}>
          <CardMedia
            className={classes.image}
            component="img"
            image={image.src}
            title="" />
        </Card>
      }
    </div>
  )
}

export default Images;