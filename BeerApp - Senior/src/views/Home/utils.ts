import { getBeerMetaData, getRandomBeerList } from "../../api";
import { ApiParams, Beer, MetaData } from "../../types";
import handle from "../../utils/error";

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(10);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchMetaData = (
  setData: (data: MetaData) => void,
  params?: ApiParams,
) => {
  (async () => {
    try {
      const { data } = await getBeerMetaData(params);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData, fetchMetaData };
