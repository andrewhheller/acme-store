import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createSchool } from '../reducers/schools';

import { stateAbbrev, formFocus } from '../utils';



// default empty "starting point" for form data
const initialState = {
  school: {
    name: '',
    description: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  },
  error: ''
}

class CreateSchool extends Component {

  constructor() {
    super()
    this.state = {
      school: {
        name: '',
        description: '',
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      error: ''
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
    const school = Object.assign({}, this.state.school, { [event.target.name]: event.target.value })
    this.setState({ school } )
  }

  handleSubmit(event) {
    const { onCreateSchool, history } = this.props;
   
    event.preventDefault();

    // wasCreated is the boolean returned from thunk createSchool
    // true = school created
    // false = school NOT created
    // after invoking thunk / dispatching action...
    // if wasCreated is false
        // set error message on state (this will displayed on page)
    // if wasCreated is true
        // school created successfully, move on and reset state and redirect
    onCreateSchool(this.state.school)
      .then(wasCreated => {
        if(!wasCreated) {
          this.setState({ error: 'School exists!  Please enter a unique name.' })
        }
        else {
          this.setState(initialState)
          history.push('/schools')
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, description, street, city, state, zip } = this.state.school;
    const { error } = this.state;

    return (
      <div className="create-school-grid-container">

        <div className="create-school-grid-item-1">
          <h2 className="sub-title-create">Create School</h2>
        </div>

        <form className="create-school-grid-item-2" onSubmit={handleSubmit}>

          <label>Name: <span className="required-field">* required</span></label>
          <br />
          <input
            required
            id="field1"
            className="input-field"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
          />
          <br />
          <br />

          <label>Description: </label>
          <br />
          <textarea
            id="field2"
            className="input-field description-field"
            name="description"
            type="text"
            value={description ? description : ''}
            onChange={handleChange}>
          </textarea>

          <h3>Address</h3>
          
          <label>Street: <span className="required-field">* required</span> </label>
          <br />
          <input
            required
            id="field3"
            className="input-field"
            name="street"
            type="text"
            value={street}
            onChange={handleChange}
          />
          <br />
          <br />

          <label>City: <span className="required-field">* required</span> </label>
          <br />
          <input
            required
            id="field4"
            className="input-field"
            name="city"
            type="text"
            value={city}
            onChange={handleChange}
          />
          <br />
          <br />

          <label>State: <span className="required-field">* required</span> </label>
          <br />
          <select
            required
            className="input-field-state"
            name="state"
            value={state}
            onChange={handleChange}
          >
            <option value="">(state)</option>

              {
                stateAbbrev.map(state => <option key={state} value={state}>{state}</option>)
              }

          </select>
          <br />
          <br />

          <label>Zip: <span className="required-field">* required</span> </label>
          <br />
          <input
            required
            id="field5"
            className="input-field"
            name="zip"
            type="text"
            minLength="5"
            value={zip}
            onChange={handleChange}  
            />
          <br />
          <br />

          <button className="create-form-btn" type="submit">Save</button>

        </form>
              
          {
            error ? <p className="error">{error}</p> : ''
          }

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
