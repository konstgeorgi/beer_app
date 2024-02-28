import { render } from "@testing-library/react";
import Search from "./Search";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("../../api", () => ({
  searchBeerList: jest.fn().mockResolvedValue({ data: [] }),
}));

test("renders Search component without crashing", () => {
  render(<Search />);
});
