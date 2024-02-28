import { useEffect, useState } from "react";
import { ApiParams, Beer, MetaData, TYPE } from "../../types";
import { fetchData } from "./utils";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  ListItemAvatar,
  Pagination,
  Typography,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";
import { fetchMetaData } from "../Home/utils";
import usePagination from "../../hooks/usePagination";
import React from "react";
import Sort from "../../components/Sort/Sort";
import Search from "../../components/Search/Search";
import styles from "./BeerList.module.css";

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [metaData, setMetaData] = useState<MetaData>();
  const [page, setCurrentPage] = useState(1);
  const [params, setParams] = useState<ApiParams>({ page: 1 });

  // eslint-disable-next-line
  useEffect(() => {
    fetchData(setBeerList, { ...params, page });
  }, [page, params]);
  // useEffect(fetchMetaData.bind(this, setMetaData), []);
  useEffect(() => {
    fetchMetaData(setMetaData);
  }, []);

  const fetchMetaDataByType = (type: TYPE) => {
    fetchMetaData(setMetaData, { by_type: type });
  };

  const getTotalPages = () => {
    if (metaData?.total && metaData?.per_page) {
      return Math.ceil(Number(metaData?.total) / Number(metaData?.per_page));
    } else {
      return 0;
    }
  };
  const { jumpToPage } = usePagination(page, setCurrentPage, getTotalPages());

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <div className={styles["form-control-group"]}>
            <Search />
            <Sort
              setParams={setParams}
              fetchMetaDataByType={fetchMetaDataByType}
              jumpToPage={jumpToPage}
            />
          </div>
          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            {beerList.map((beer) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={beer.id}
                sx={{ cursor: "pointer" }}
              >
                <Card onClick={onBeerClick.bind(this, beer.id)}>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={4}>
                        <ListItemAvatar>
                          <Avatar>
                            <SportsBar />
                          </Avatar>
                        </ListItemAvatar>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="h6">{beer.name}</Typography>
                        <Typography variant="subtitle1">
                          {beer.brewery_type}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={getTotalPages()}
            color="primary"
            page={page}
            onChange={(event, value) => {
              jumpToPage(value);
            }}
          />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
