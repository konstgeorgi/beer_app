import { useEffect, useState } from "react";
import { fetchData } from "./utils";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Paper, Link, Typography } from "@mui/material";
import styles from "./Home.module.css";
import { useFavouriteBeers } from "../../context/FavouriteBeersContext";
import Search from "../../components/Search/Search";

const Home = () => {
  const { favouriteBeers, setFavouriteBeers } = useFavouriteBeers();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>(favouriteBeers);

  // eslint-disable-next-line
  // useEffect(fetchData.bind(this, setBeerList), []);
  useEffect(() => fetchData(setBeerList), []);

  const removeAllFavouriteBeers = () => {
    setFavouriteBeers([]);
    setSavedList([]);
  };

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                {/*<TextField label="Filter..." variant="outlined" />*/}
                <Search />
                <Button
                  variant="contained"
                  onClick={() => fetchData(setBeerList)}
                >
                  Reload list
                </Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <li key={index.toString()}>
                    {/*<Checkbox />*/}
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      <Typography variant="h6" component="h2">
                        {beer.name}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button
                  variant="contained"
                  size="small"
                  onClick={removeAllFavouriteBeers}
                >
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    {/*<Checkbox />*/}
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      <Typography variant="h6" component="h2">
                        {beer.name}
                      </Typography>
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
