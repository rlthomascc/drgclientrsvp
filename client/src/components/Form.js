import React, { Component } from 'react';
import axios from 'axios';
import {
    Route, HashRouter, BrowserRouter, Redirect, Router,
  } from 'react-router-dom';


const Form = (props) => {


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/rsvp', {
            name: e.target.fullname.value,
            spouseName: e.target.spousename.value,
            phone: e.target.phoneNumber.value,
            agent: e.target.agent.value,
            guests: e.target.guests.value,
        })
        props.route(e.target.agent.value, true);
    }

    const form = () => (
        <div className="form container">
            <form onSubmit={handleSubmit}>
            <div>
                <a href="/"><img src="/photos/smaller.png" width="200px"/></a>
                <p className="text-info"><b className="h4 font-weight-bold">The Del Real Group Registration: </b><br/>
                <b className="text-info"> Annual Client Appreciation Event </b></p>
            </div>
            <div className="row form-group">
                <div className="col">
                    <label>Full Name</label>
                    <input type="text" className="form-control" placeholder="John Doe" id="fullname" required />
                    <small className="form-text text-muted">
                    Enter your full first and last name.
                    </small>
                </div>
                <div className="col">
                    <label>Spouse Name</label>
                    <input type="text" className="form-control" placeholder="Jane Doe" id="spousename" />
                    <small className="form-text text-muted">
                    Enter full first and last name of your spouse.
                    </small>
                </div>
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input type="text" className="form-control" placeholder="Enter 10 digit Phone Number" pattern="\d*" minLength="7" maxLength="10" id="phoneNumber" required />
                <small className="form-text text-muted">
                Enter phone number with numbers only, no special characters.
                </small>
            </div>
            <div className="form-group">
                <label>Agent</label>
                <select className="form-control" id="agent" required>
                    <option value="">Choose One...</option>
                    <option value="Jennapher Bell">Jennapher Bell</option>
                    <option value="Joseph Bondi">Joseph Bondi</option>
                    <option value="Daniel Del Real">Daniel Del Real</option>
                    <option value="Eddie Sanchez"> Eddie Sanchez</option>
                    <option value="Indalecio Andy Del Real">Indalecio 'Andy' Del Real</option>
                    <option value="Jennifer Edwards">Jennifer Edwards</option>
                    <option value="Luke Foster">Luke Foster</option>
                    <option value="Matt Foster">Matt Foster</option>
                    <option value="James Garcia">James Garcia</option>
                    <option value="Carlos Gutierrez">Carlos Gutierrez</option>
                    <option value="Jared Howell">Jared Howell</option>
                    <option value="Patricia Servin-Martinez">Patricia Servin-Martinez</option>
                    <option value="Michael Meneses">Michael Meneses</option>
                    <option value="Amanda Stallcup">Amanda Stallcup</option>
                    <option value="Nathan Steingrebe">Nathan Steingrebe</option>
                    <option value="Randy Thomas">Randy Thomas</option>
                    <option value="Don Wright">Don Wright</option>
                </select>
            </div>
            <div className="form-group">
                <label>Number Of Guests</label>
                <select className="form-control" id="guests" required>
                    <option value="">Choose One...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div>
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            </div>
        </form>
    </div>
    );
  
  
    if (props.redirect === true){
        console.log(true, '....its true')
        return <Redirect to = {{ pathname: "/success" }} />;
    } else {
        return (
            <div>
        {form()}
      </div>
    );
    }
  };
  
export default Form;