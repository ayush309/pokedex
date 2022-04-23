import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#7e7e7e",
  fontColor: "#000",
};

export const darkTheme = {
  body: "#0d0081",
  fontColor: "#fff",
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
`;
