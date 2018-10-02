import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteSchool, updateSchool } from '../reducers/schools';

import ManageStudents from './ManageStudents';

import { stateAbbrev, formFocus } from '../utils';


class UpdateSchool extends Component {

  constructor() {
    super();
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
    const { school } = this.props;
    this.setState(school);

    // form focus
    const fields = [ 'field1', 'field2', 'field3', 'field4', 'field5' ];
    formFocus(fields);
  }

  componentDidUpdate(prevProps) {
    const { school } = this.props

    if(prevProps !== this.props) {
      this.setState(school)
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    const { onUpdateSchool, history } = this.props;

    event.preventDefault();
    onUpdateSchool(this.state)
      .then(() => history.push('/schools'))
      .catch(error => console.log(error))
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { onDeleteSchool, school, id } = this.props;
    const { name, description, street, city, state, zip } = this.state;

    return (

      <div>
        
        <div className="title-block">
          <div className="update-school-name">
            <h2>{name}</h2>
          </div>
        </div>

        <div className="update-school-grid-container">

          <div className="update-school-grid-item-1">

            <div className="update-school-sub-title">
              <h3>Update School</h3>
            </div>

            <form onSubmit={handleSubmit}>

              <label>Name:<span className="required-field"> * required</span></label>
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

              <label>Description:</label>
              <br />
              <textarea
                id="field2"
                className="input-field description-field"
                name="description"
                type="text"
                value={description}
                onChange={handleChange}
              ></textarea>

              <h3>Address</h3>

              <label>Street:<span className="required-field"> * required</span></label>
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

              <label>City:<span className="required-field"> * required</span></label>
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

              <label>State:<span className="required-field"> * required</span></label>
              <br />
              <select className="input-field-state" name="state" value={state} onChange={handleChange}>
                <option value="">(state)</option>

                  {
                    stateAbbrev.map(state => <option key={state} value={state}>{state}</option>)
                  }

              </select>
              <br />
              <br />

              <label>Zip:<span className="required-field"> * required</span></label>
              <br />
              <input
                required
                id="field5"
                className="input-field"
                name="zip"
                type="text"
                value={zip}
                onChange={handleChange}
                minLength="5"
              />
              <br />
              <br />

              <button className="create-form-btn" type="submit">Save</button>
              <button
                className="delete-form-btn"
                type="button"
                onClick={() => onDeleteSchool(school)}
              >
                Delete
              </button>
            </form>
          </div>

          <div className="update-school-grid-item-2">
            <ManageStudents schoolId={id} schoolName={name} />
          </div>

        </div>
      </div>
    )
  }

}

const mapStateToProps = ({ schools }, { match }) => {
  const id = +match.params.id;

  if(!schools) {
    return null
  }

  return {
    school: schools.find(school => school.id === id),
    id
  }

}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    onDeleteSchool: (school) => {
      dispatch(deleteSchool(school))
        .then(() => history.push('/schools'))
    },

    onUpdateSchool: (school) => dispatch(updateSchool(school)),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateSchool);
