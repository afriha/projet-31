import React, { Component } from "react";
import { Link , withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirmUser } from "../../actions/confirmActions";
import classnames from "classnames";
class Confirmation extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      token:"",
      errors: {}
    };
  }
componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
    const { token } = this.props.match.params;
    this.setState({token : token});
}

componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if(nextProps.errors.nonValide){
      this.props.history.push("/resend");
    }

  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
    const userData = {
          email: this.state.email,
          token: this.state.token
    };      
this.props.confirmUser(userData, this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
render() {
    const { errors } = this.state;
    const { token } = this.state;
return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Revenir à
              l'accueil
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Confirmation</b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={token}
                  error={errors.token}
                  id="token"
                  type="hidden"
                  className={classnames("", {
                    invalid: errors.nonValide || errors.nonTrouve || errors.alreadyVerified
                  })}
                />
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Confirmer
                </button>
                <h5>
                <span className="red-text">
                  {errors.nonValide}
                  {errors.nonTrouve}
                  {errors.alreadyVerified}
                </span>
                </h5>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Confirmation.propTypes = {
  confirmUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  conf: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  conf: state.conf,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { confirmUser }
)(withRouter(Confirmation));