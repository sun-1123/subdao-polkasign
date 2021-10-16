import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body,html{
  /* background: #F9FAFF !important; */
  height: 100% !important;

  #root{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
`;

export default GlobalStyle;
