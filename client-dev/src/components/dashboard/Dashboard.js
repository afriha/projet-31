import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onCalculClick = e => {
    e.preventDefault();
    this.props.history.push('/calculatrice');
  };
render() {
    const { user } = this.props.auth;
return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Salut!</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                {" "}
                <span>Vous êtes connecté!</span> 👏
              </p>
            </h4>
            <button
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onCalculClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            > Calculatrice
            </button>
            <br />
            <button
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            > Se déconnecter
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  conf: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  conf: state.conf
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);