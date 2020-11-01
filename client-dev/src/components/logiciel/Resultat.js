import React, { Component } from "react";
import { Link , withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class Resultat extends Component {

render() {

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
                <b>Resultat</b> <br /> <br />
                <span>{this.props.calc.resultat.stdout}</span><br /><br />
                <Link
            to="/calculatrice"
              style={{
                width: "280px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect white hoverable black-text"
            >
              Faire un autre calcul
            </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Resultat.propTypes = {
  calc: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  calc: state.calc,
  errors: state.errors
});
export default connect(
  mapStateToProps
)(withRouter(Resultat));