import { SubstrateContextProvider } from "./api/contracts";
import GlobalStyle from "./utils/GlobalStyle";

// import Headertop from "./components/header";
// import Content from "./components/content";
import Content from "./components/MyContent";
// import styled from "styled-components";

// const Layout = styled.div`
//   width: 1000px;
//   margin: 50px auto;
// `;

function App() {
  return (
    <SubstrateContextProvider>
      {/* <Headertop /> */}
      <Content />
      <GlobalStyle />
    </SubstrateContextProvider>
  );
}

export default App;
