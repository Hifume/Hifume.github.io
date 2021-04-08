import './App.css';
import bigchungus from './assets/bigchungus.png';
import bigchungusnaturalhabitat from './assets/bigchungusnaturalhabitat.png';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faImages, faQuestion, faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const API_URL = "https://bigchungus420comapi.herokuapp.com/";
// const API_URL = "http://localhost:8000/";

const NavLink = styled(Link)`
    color: blue;
    text-decoration: none;
    margin-right: 30px;
    font-size: 20px;
    color: white;
`;

const StarButton = styled.button`
  backgroundColor: none;
  border: none;
  padding: 5px;
  margin: 2px;
`;

const StarIcon = styled(FontAwesomeIcon)`
  color: grey;
  &:hover {
    color: yellow;
  }
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

const IMAGE_LIST = [{source: bigchungus, id: 1, desc: "Big Chungus in a resting state"}, {source: bigchungusnaturalhabitat, id: 2, desc: "Big Chungus in his natural habitat"}]

const Images =_=> {
  return (
    <div style={{display: "flex", flex: "1", flexDirection: "column", alignItems: "center"}}>

      <button
        style={{backgroundColor: "#AAA", border: "none", width: "150px", height: "50px", borderRadius: "4px", marginBottom: "5px"}}
        onClick={() => {
          if (window.confirm("Are you sure? You are leaving BigChungus420.com to go to google.com. BigChungus420.com cannot guarantee that this link is safe.")) {
            window.open("https://www.google.com/search?q=big+chungus&tbm=isch", "_blank").focus(); 
          }
        }}>
        Find More Chungus
      </button>

      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        {IMAGE_LIST.map((item) => (
          <Image source={item.source} id={item.id} desc={item.desc}/>
        ))}
      </div>
    </div>
  );
}

const Image = props => {
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", margin: "20px"}}>
      <img style={{height: "100px"}} src={props.source} />
      <p>{props.desc || "Image of Big Chungus"}</p>
      <Rating id={props.id} />
    </div>
  );
}

const RATINGS = [1, 2, 3, 4, 5];

const sendRating = (id, rating) => {
  let body;
  let user_id;
  if (rating) {
    if (localStorage.user_id) {
      user_id = localStorage.user_id;
    } else {
      user_id = uuidv4();
      localStorage.user_id = user_id;
      console.log("New device detected, assigning id: ", user_id);
    }
    body = JSON.stringify({"item_id": id, "rating": rating, "user_id": user_id});
  } else {
    body = JSON.stringify({"item_id": id});
  }
  return fetch(API_URL + 'rating', {
      method: 'POST',
      auth: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then(response => response.json())
    .then((response) => {
      if (response.your_rating !== "None") {
        return -response.your_rating;
      }
      return Math.round(response.item_rating);
    })
}

const GetStarColor = (rating, item) => {
  if (rating >= item) {
    return "yellow";
  }
  if (rating <= -item) {
    return "orange";
  }
  return "grey";
}

const Rating = props => {
  const [rating, setRating] = useState(0);
  useEffect(() => {
    if (rating == 0) {
      sendRating(props.id).then((r) => setRating(r));
    }
  }, [rating])
  console.log(rating);
  return (
    <div>
      {RATINGS.map((item) => (
        <StarButton key={item} onClick={() => sendRating(props.id, item).then((response) => setRating(response))}><StarIcon style={{color: GetStarColor(rating, item)}} icon={faStar}/></StarButton>
      ))}
    </div>
  );
}

const About =_=> {
  return(
    <div style={{display: "flex", flex: "1", flexDirection: "column", alignItems: "center", maxWidth: "500px"}}>
      <h2>Our mission: </h2>
      BigChungus420.com was created for the sole purpose of sharing the glorious creature that is Big Chungus with the world.
      <h2>Changelog</h2>
      <ul>
      4/7/2021:
      <li>Added epic chungus image rating system.</li>
      <li>Made room for more chungus.</li>
      <li>Did some behind the scenes work that will allow us to add more chungus easily.</li>
      </ul>
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
