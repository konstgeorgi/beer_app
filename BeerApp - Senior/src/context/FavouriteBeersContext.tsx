import React, { createContext, useContext } from "react";
import { Beer as IBeer } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface IFavouriteBeersContext {
  favouriteBeers: IBeer[];
  addFavourite: (beer: IBeer) => void;
  removeFavourite: (beer: IBeer) => void;
  isFavourite: (beer: IBeer) => boolean;
  setFavouriteBeers: (newValue: IBeer[]) => void;
}

export const FavouriteBeersContext = createContext<
  IFavouriteBeersContext | undefined
>(undefined);

export const FavouriteBeersProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favouriteBeers, setFavouriteBeers] = useLocalStorage<IBeer[]>(
    "favouriteBeers",
    [],
  );

  const addFavourite = (beer: IBeer) => {
    const newFavouriteBeers = [...favouriteBeers, beer];
    setFavouriteBeers(newFavouriteBeers);
  };

  const removeFavourite = (beer: IBeer) => {
    const newFavouriteBeers = favouriteBeers.filter(
      (b: IBeer) => b.id !== beer.id,
    );
    setFavouriteBeers(newFavouriteBeers);
  };

  const isFavourite = (beer: IBeer) => {
    return favouriteBeers.some((favBeer: IBeer) => favBeer.id === beer.id);
  };

  return (
    <FavouriteBeersContext.Provider
      value={{
        favouriteBeers,
        addFavourite,
        removeFavourite,
        isFavourite,
        setFavouriteBeers,
      }}
    >
      {children}
    </FavouriteBeersContext.Provider>
  );
};

export const useFavouriteBeers = (): IFavouriteBeersContext => {
  const context = useContext(FavouriteBeersContext);
  if (!context) {
    throw new Error(
      "useFavouriteBeers must be used within a FavouriteBeersProvider",
    );
  }
  return context;
};
