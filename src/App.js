import styled,{createGlobalStyle} from "styled-components";
import Home from "./Pages/Home";

//*(styled-componets) used to style the components 
const Container = styled.div`
 background-color: #FFFFFF;
 margin: 100px 200px;
`

const GlobalStyle = createGlobalStyle`
 body{
  margin: 0px;
 }
`

function App() {
  return (
    <Container>
    <GlobalStyle/>
    <Home/>
    </Container>
    
  );
}

export default App;
