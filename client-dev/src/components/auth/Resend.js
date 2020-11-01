import React, { Component } from "react";
import { Link , withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resendUser } from "../../actions/confirmActions";
import classnames from "classnames";
class Resend extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      message: "",
      token: "",
      errors: {}
    };
  }
componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
      if(this.props.errors.nonValide){
        this.setState({
            token: this.props.errors.nonValide + "Entrez votre mail pour en recevoir un autre"
        })
      }  
}

componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if(nextProps.conf.message){
        this.setState({
            email: "",
            message: nextProps.conf.message,
        })
      }

  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
    const userData = {
          email: this.state.email
    };      
this.props.resendUser(userData);
  };
render() {
    const { errors } = this.state;
    const  message  = this.state.message;
    const  token  = this.state.token;

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
                <b>Renvoi</b>
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
                  Renvoyer
                </button>
                <h5>
                <span className="red-text">
                  {errors.nonTrouve}
                  {errors.alreadyVerified}
                  {token}
                </span>
                <span className="green-text">
                  {message}
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
Resend.propTypes = {
  resendUser: PropTypes.func.isRequired,
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
  { resendUser }
)(withRouter(Resend));