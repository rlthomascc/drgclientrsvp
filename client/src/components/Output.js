import React, { Component } from 'react';


const Output = (props) => {

    const output = () => (
        <div className="container-fluid">
        <a href="/"><img className="img-fluid" src="/photos/smaller.png" width="200px"/></a>
        <br />
          <a href='http://www.delrealgroupreviews.com/' target="_blank"><img className="img-fluid" src="https://i.imgur.com/prCpQ2p.jpg" width="900px" /></a>
          <br />
          <br />
            <p className="font-weight-bold">
            Thank you for taking the time to register <br /> 
            to the annual Del Real Group Client Appreciation Event! <br />
            </p>
              <p className="text-success font-weight-bold font-italic">Leave a review to be entered into our Tropical Vacation Giveaway</p>
              <a href="http://www.delrealgroupreviews.com/" target="_blank" className="btn btn-success btn-large">Click Here to Leave a Review</a>
            <br />
            <br />
            <a href="/" className="btn btn-primary">New Registration</a>
        </div>
    );
  
  
    return (
        <div className="success">
        {output()}
      </div>
    );
  };
  
  export default Output;
