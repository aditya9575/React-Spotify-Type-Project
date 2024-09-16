import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Spinner from 'react-bootstrap/Spinner';

import axios from "axios";

function NavBar() {
  const [tracks, setTracks] = useState([]);

//this state is for keeping track according to the user input
const[keyWord , setKeyWord] = useState("");
//this state is for loading animation 
const[isLoading , setIsLoading] = useState(false);

  const getTracks = async () => {
setIsLoading(true)
    try {
      const response = await axios.get(
        `https://v1.nocodeapi.com/aditya_mehto/spotify/jlekhFboAKnfiCmK/search?type=track&q=${keyWord}`
      );
      const convertedData = await response.data;
      //api response consists of tracks -> inside tracks -> items -> items is music -> music has its own albums , artists etc
      // so we will destructure in this way while mapping over the response
    //   console.log(convertedData.tracks.items); //for testing the response
      setTracks(convertedData.tracks.items);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  return (
    <>
      {/*______________________________________________________  */}
      <Navbar expand="lg" className="bg-body-tertiary ">
        <Container fluid>
          <Navbar.Brand href="#">Symphony-Stream🎧</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form.Control
            value={keyWord}
              type="search"
              placeholder="Find your favorite songs"
              className="me-2 w-75"
              aria-label="Search"
              onChange={(e)=>{setKeyWord(e.target.value)}}
            />
            <Button variant="outline-success" onClick={getTracks}>Search</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/*______________________________________________________  */}

{isLoading ? <div className="text-center">
     <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    <h2>Loading...</h2>
</div>

     : 
      <div className="container">
        <div className="row">
          
          {tracks.map((element) => {
            return (
              <div key={element.id} className="col-lg-3 col-md-6 py-2">
                
                <Card >
                  <Card.Img variant="top" src={element.album.images[1].url} />
                  <Card.Body>
                    <Card.Title>{element.name}</Card.Title>
                    <Card.Text>
                     Artist:{element.album.artists[0].name}
                    </Card.Text>
                    <Card.Text>
                     Release date:{element.album.release_date}
                    </Card.Text>
                    <audio src={element.preview_url} controls className="w-100"></audio>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
}
    </>
  );
}

export default NavBar;
