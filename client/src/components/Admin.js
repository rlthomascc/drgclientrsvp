import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';



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
      suggestionNames: [],
      suggestionPhones: [],
      csv: "",
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


  printByPhone(e) {
    e.preventDefault();
    let potentialLeads = [];
    let input = e.target.value;
    this.state.docs.forEach((elem, i) => {
      if (elem.phoneNumber.toString().substring(0, input.length) === input) {
        potentialLeads.push(elem.phoneNumber.toString());
      }
    })
    this.setState({
      suggestionPhones: potentialLeads
    })
  }

  printByName(e) {
    e.preventDefault();
    let potentialLeads = [];
    let input = e.target.value;
    this.state.docs.forEach((elem, i) => {
      if (elem.fullName.toLowerCase().substring(0, input.length) === input.toLowerCase()) {
        potentialLeads.push(elem.fullName)
      } 
      if (elem.spouseName.toLowerCase().substring(0, input.length) === input.toLowerCase()){
        potentialLeads.push(elem.spouseName)
      }
    })
    this.setState({
      suggestionNames: potentialLeads
    })
  }

  printNameTag(e) {
    e.preventDefault();
    let name = e.target.name.value;
    let phone = e.target.phoneNumber.value;
  }

  authentic() {
    return (
      <div className="container form">
        <a href="/"><img src="/photos/smaller.png" width="200px"/></a>
        <p id="totalCount" className="font-weight-bold h6">Total Registered Guests: {this.state.total} | Total Guests In Attendance: {this.state.guests}</p>
        <br/>

        {/* PRINT OUT NAMETAGS */}
        <form className="formhub col-sm-10 align-content-center" onSubmit={this.printNameTag.bind(this)}>
          <div className="form-group">
            <label className="font-weight-bold text-primary h4">Check in Leads</label>
            <br/>
            <br/>
            <label className="font-weight-bold h6">Check in by Name</label>
              <input list="nameUL" type="text" id="name" className="form-control" onFocus={this.state.suggestion} onChange={this.printByName.bind(this)} />
              <datalist id="nameUL">
                {this.state.suggestionNames.map((elem, i) => {
                  return <option key={i} value={elem}>{elem}</option>
                })}
              </datalist>
              <small className="form-text text-muted">
                Type in clients full name.
              </small>
          </div>
          <div className="form-group">
            <label className="font-weight-bold h6">Check in by Phone Number</label>
            <input list="phoneUL" type="text" id="phoneNumber" className="form-control" pattern="\d*" minLength="7" maxLength="10" onChange={this.printByPhone.bind(this)} />
            <datalist id="phoneUL">
                {this.state.suggestionPhones.map((elem, i) => {
                  return <option key={i} value={elem}>{elem}</option>
                })}
              </datalist>
            <small className="form-text text-muted">
              Enter phone number with numbers only, no special characters.
            </small>
        </div>
        <button type="submit" className="btn btn-primary">Print Name Tag</button>
        </form>


        {/* PRINT OUT CSV */}
        <form className="formhub col-sm-11" onSubmit={this.createCsv.bind(this)}>
              <div className="form-group">
                <label className="font-weight-bold text-primary h4">Export Leads</label>
                <br/>
                <br />
                <label className="font-weight-bold h6">Choose Agent</label>
                <select className="form-control" id="agent" required>
                  <option value="All">All Agent Leads</option>
                  {this.state.agents.map((e, i) => {
                    return <option key={i} value={e}>{e}</option>
                  })}
              </select>
              <small className="form-text text-warning">
              **if name not showing then they do not have records in database**
              </small>
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
        <form className="formhub col-sm-10 align-content-center" onSubmit={this.handleSubmit.bind(this)}>
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
