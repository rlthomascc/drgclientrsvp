import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { AlertContext } from 'twilio/lib/rest/monitor/v1/alert';



class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "delreal",
      auth: false,
      docs: [],
      agents: [],
      total: 0,
      guests: 0,
      leadName: "",
      leadInput: "",
      csv: ""
    }
  }

  componentDidMount() {
    let agents = []
    let data = [];

    axios.get('/rsvp')
    .then(res => {
      data = res.data;
      res.data.filter((elem, i) => { 
        if (!agents.includes(elem.agent)){
          agents.push(elem.agent);
        }
      });
      this.setState({
        docs: data,
        agents: agents,
        total: res.data.length,
        guests: res.data.reduce((acc, elem) => {
            return acc + elem.guests
        }, 0)
      })
    })
    .catch(err => { console.log(err) })
  }

  createCsv(e) {
    e.preventDefault();
    let csv = "fullName, spouseName, phoneNumber, agent, guests, year \n";
    let orgDocs = [];
    
    if (e.target.agent.value === "All") {
      this.state.docs.forEach((e, i) => csv = csv + (e.fullName + " ," + e.spouseName + " ," + e.phoneNumber + " ," + e.agent + " ," + e.guests + " ," + e.timestamp + "\n"))
    } else {
      this.state.docs.map((elem, i) => {
        if (elem.agent === e.target.agent.value){
          orgDocs.push(elem);
        }
      })
      orgDocs.forEach((e, i) => csv = csv + (e.fullName + " ," + e.spouseName + " ," + e.phoneNumber + " ," + e.agent + " ," + e.guests + " ," + e.timestamp + "\n"))
    }

      const link = document.createElement('a')
      link.href = 'data:text/csv,' + encodeURIComponent(csv)
      link.download = "DRG_RSVP_" + e.target.agent.value + "_Leads.csv"
      link.click();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (e.target.password.value === this.state.password){
      this.setState({
        auth: true
      })
    } else {
      alert("Password Incorrect!! Please try again. **passwords case sensitive**");
    }
  }

  printNameTag(e) {
    e.preventDefault();
  }

  authentic() {
    return (
      <div className="container form">
        <a href="/"><img src="/photos/smaller.png" width="200px"/></a>
        <p id="totalCount" className="font-weight-bold h6">Total Registered Guests: {this.state.total} | Total Guests In Attendance: {this.state.guests}</p>
        <br/>
        <form className="container formhub col-sm-10 align-content-center" onSubmit={this.printNameTag.bind(this)}>
          <div className="form-group">
            <label className="font-weight-bold text-primary h4">Check in Leads</label>
            <br/>
            <br/>
            <label className="font-weight-bold h6">Check in by Name</label>
            <input type="text" id="name" className="form-control" placeholder="Full Name" onChange={this.printNameTag.bind(this)} />
          </div>
          <div className="form-group">
            <label className="font-weight-bold h6">Check in by Phone Number</label>
            <input type="text" id="phoneNumber" className="form-control" placeholder="Enter 10 digit Phone Number" pattern="\d*" minLength="7" maxLength="10" onChange={this.printNameTag.bind(this)} />
        </div>
        <button type="submit" className="btn btn-primary">Print Name Tag</button>
        </form>

        <form className="container formhub col-sm-11" onSubmit={this.createCsv.bind(this)}>
              <div className="form-group">
                <label className="font-weight-bold text-primary h4">Export Leads</label>
                <br/>
                <br />
                <label className="font-weight-bold h6">Choose Agent</label>
                <p className="text-warning font-style-italic">**if name not showing then they do not have records in database**</p>
                <select className="form-control" id="agent" required>
                  <option value="All">All Agent Leads</option>
                  {this.state.agents.map((e, i) => {
                    return <option key={i} value={e}>{e}</option>
                  })}
              </select>
              </div>
              <div>
                  <button type="submit" className="btn btn-primary">Download CSV</button>
              </div>
          </form>
      </div>
    )
  }

  password() {
    return (
      <div  className="container form">
        <form className="container col-sm-10 align-content-center" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <a href="/"><img src="/photos/smaller.png" width="200px"/></a>
              <br/>
              <label className="font-weight-bold h3">Enter Passcode</label>
              <input type="password" className="form-control" placeholder="**********" id="password" required />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
      </div>
    )
  }

  
  render() {
    if (this.state.auth === true){
      return (
        this.authentic()
      )
    } else {
      return (
          this.password()
        );
      }
  }
}

export default Admin;
