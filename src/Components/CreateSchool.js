import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createSchool } from '../reducers/schools';

import { stateAbbrev, formFocus } from '../utils';



// default empty "starting point" for form data
const initialState = {
  name: '',
  description: '',
  street: '',
  city: '',
  state: '',
  zip: ''
}

class CreateSchool extends Component {

  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // form focus
    const fields = [ 'field1', 'field2', 'field3', 'field4', 'field5' ];
    formFocus(fields);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const { onCreateSchool, history } = this.props;
   
    event.preventDefault();
    onCreateSchool(this.state)
      .then(wasCreated => console.log(wasCreated))
      .then(() => this.setState(initialState))
      .then(() => history.push('/schools'))
      .catch(error => console.log(error));
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, description, street, city, state, zip } = this.state;

    return (
      <div className="create-school-grid-container">

        <div className="create-school-grid-item-1">
          <h2 className="sub-title-create">Create School</h2>
        </div>

        <form className="create-school-grid-item-2" onSubmit={handleSubmit}>

          <label>Name: <span className="required-field">* required</span></label>
          <br />
          <input id="field1" className="input-field" name="name" type="text" value={name} onChange={handleChange} required/>
          <br />
          <br />

          <label>Description: </label>
          <br />
          <textarea id="field2" className="input-field description-field" name="description" type="text" value={description ? description : ''} onChange={handleChange}></textarea>

          <h3>Address</h3>
          
          <label>Street: <span className="required-field">* required</span> </label>
          <br />
          <input id="field3" className="input-field" name="street" type="text" value={street} onChange={handleChange} required />
          <br />
          <br />

          <label>City: <span className="required-field">* required</span> </label>
          <br />
          <input id="field4" className="input-field" name="city" type="text" value={city} onChange={handleChange} required/>
          <br />
          <br />

          <label>State: <span className="required-field">* required</span> </label>
          <br />
          <select className="input-field-state" name="state" value={state} onChange={handleChange} required>
            <option value="">(state)</option>

              {
                stateAbbrev.map(state => <option key={state} value={state}>{state}</option>)
              }

          </select>
          <br />
          <br />

          <label>Zip: <span className="required-field">* required</span> </label>
          <br />
          <input id="field5" className="input-field" name="zip" type="text" value={zip} onChange={handleChange} minLength="5" required />
          <br />
          <br />

          <button className="create-form-btn" type="submit">Save</button>

        </form>
      </div>
    )

  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateSchool: (school) => dispatch(createSchool(school))
  }
}


export default connect(null, mapDispatchToProps)(CreateSchool);
