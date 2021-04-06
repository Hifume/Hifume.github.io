import './App.css';
import bigchungus from './assets/bigchungus.png';
import bigchungusnaturalhabitat from './assets/bigchungusnaturalhabitat.png';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileAlt, faImages, faQuestion } from '@fortawesome/free-solid-svg-icons';

const NavLink = styled(Link)`
    color: blue;
    text-decoration: none;
    margin-right: 30px;
    font-size: 20px;
    color: white;
`;

const App =_=> {
  return (
    <Router>
      <div style={{display: "flex", flex: "1", flexDirection: "column", alignItems: "center", width: "100vw", height: "100vh"}}>
        <div style={{marginBottom: "30px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100vw", backgroundColor: "#AAA", maxHeight: "10vh"}}>
          <div style={{display: "flex", flex: "1", flexDirection: "column", padding: 5}}>
            <h1 style={{marginBottom: 0}}>Welcome to BigChungus420.com</h1>
            <h3 style={{marginTop: 0, color: "#555"}}>Your number one source for Big Chungus</h3>
          </div>
          <nav style={{display: "flex", flex: "1", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>
            <NavLink to="/images"><FontAwesomeIcon icon={faImages} style={{marginRight: 5}}/>Images</NavLink>
            <NavLink to="/about"><FontAwesomeIcon icon={faFileAlt} style={{marginRight: 5}}/>About</NavLink>
            <NavLink to="/help"><FontAwesomeIcon icon={faQuestion} style={{marginRight: 5}}/>Help</NavLink>
          </nav>
        </div>

        <Switch>
          <Route exact path="/"><Redirect to="/images" /></Route>
          <Route path="/images">
            <Images />
          </Route>
          <Route path="/about"> 
            <About />
          </Route>
          <Route path="/help"> 
            <Help />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Images =_=> {
  return (
    <div style={{display: "flex", flex: "1", flexDirection: "column", alignItems: "center"}}>

      <button
        onClick={() => {
          if (window.confirm("Are you sure? You are leaving BigChungus420.com to go to google.com. BigChungus420.com cannot guarantee that this link is safe.")) {
            window.open("https://www.google.com/search?q=big+chungus&tbm=isch", "_blank").focus(); 
          }
        }}>
        Find More Chungus
      </button>

      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <img style={{display: "flex", flex: "0", width: "30vw"}} src={bigchungus} />
          <p>Big Chungus in a resting state</p>
        </div>

        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <img style={{display: "flex", flex: "0", width: "30vw"}} src={bigchungusnaturalhabitat} />
          <p>Big Chungus in his natural habitat</p>
        </div>
      </div>
    </div>
  );
}

const About =_=> {
  return(
    <div style={{display: "flex", flex: "1", flexDirection: "column", alignItems: "center"}}>
      BigChungus420.com was created for the sole purpose of sharing the glorious creature that is Big Chungus with the world.
    </div>
  );
}

const Help =_=> {
  return(
    <div style={{display: "flex", flex: "1", flexDirection: "column", alignItems: "center"}}>
      If you can't see the images, try opening your eyes.
    </div>
  );
}

export default App;
