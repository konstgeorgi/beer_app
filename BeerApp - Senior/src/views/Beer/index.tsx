import { useEffect, useState } from "react";
import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import { useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { useFavouriteBeers } from "../../context/FavouriteBeersContext";

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  const { addFavourite, removeFavourite, isFavourite } = useFavouriteBeers();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);
  const toggleFavourite = () => {
    if (beer === undefined) {
      return;
    }
    if (isFavourite(beer)) {
      removeFavourite(beer);
    } else {
      addFavourite(beer);
    }
  };

  if (beer === undefined) {
    return <div>Beer with that ID doesn't Exist.</div>;
  }

  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <IconButton
          onClick={toggleFavourite}
          aria-label="favourite"
          color="primary"
        >
          {isFavourite(beer) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="h4" component="div">
          {beer?.name}
        </Typography>
        <Typography variant="body1" component="div">
          <b>Type: </b> {beer?.brewery_type}
        </Typography>
        <Typography variant="body1" component="div">
          <b>Address: </b> {beer?.street}
        </Typography>
        <Typography variant="body1" component="div">
          <b>City: </b> {beer?.city}
        </Typography>
        <Typography variant="body1" component="div">
          <b>Country: </b> {beer?.country}
        </Typography>
        <Typography variant="body1" component="div">
          <b>State: </b> {beer?.state}
        </Typography>
        <Typography variant="body1" component="div">
          <b>Website: </b> <a href={beer?.website_url}>{beer?.website_url}</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Beer;
