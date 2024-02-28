import {
  Chip,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { ApiParams, SORT, TYPE } from "../../types";

type SortProps = {
  setParams: (params: ApiParams) => void;
  fetchMetaDataByType: (type: TYPE) => void;
  jumpToPage: (type: number) => void;
};
const Sort = ({ setParams, fetchMetaDataByType, jumpToPage }: SortProps) => {
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [activeType, setActiveType] = useState(""); // new state variable
  const typeList: TYPE[] = [
    "micro",
    "nano",
    "regional",
    "brewpub",
    "large",
    "planning",
    "bar",
    "contract",
    "proprietor",
    "closed",
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setValue(newValue);
    handleSearch(newValue, type);
  };

  const handleSearch = (sortValue: string, type: string) => {
    if (type) {
      const params: ApiParams = {
        by_type: type as TYPE,
        sort: sortValue as SORT,
      };
      setParams(params);
      jumpToPage(1);
    } else {
      const params: ApiParams = {
        sort: sortValue as SORT,
      };
      setParams(params);
    }
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="name:asc"
          control={<Radio />}
          label="Ascending"
        />
        <FormControlLabel
          value="name:desc"
          control={<Radio />}
          label="Descending"
        />
      </RadioGroup>
      <Stack
        flexWrap="wrap"
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 2, md: 2 }}
      >
        {typeList.map((type) => (
          <Chip
            label={type}
            key={type}
            variant="outlined"
            color={activeType === type ? "primary" : "default"} // set color based on activeType
            onClick={() => {
              setType(type);
              setActiveType(type); // set activeType when chip is clicked
              fetchMetaDataByType(type as TYPE);
              handleSearch(value, type);
            }}
          />
        ))}
      </Stack>
    </FormControl>
  );
};
export default Sort;
