import React, { Component } from "react";
import { Link , withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PushSpinner } from "react-spinners-kit";
import { Calcul } from "../../actions/calculActions";
import classnames from "classnames";
class Calculatrice extends Component {
  constructor() {
    super();
    this.state = {
      pchiffre: "",
      dchiffre: "",
      opr:"",
      resultat:"",
      loading:false,
      errors: {}
    };
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (this.props.errors!==nextProps.errors){
      this.setState({loading:false});
    }
    if (nextProps.calc.fait) {
      this.props.history.push("/resultat");
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
    const userData = {
          pchiffre: this.state.pchiffre,
          dchiffre: this.state.dchiffre,
          opr: this.state.opr
    };
this.setState({loading:true});
this.props.Calcul(userData);
};
render() {
    const { errors } = this.state;
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
                <b>Simple calcul</b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.pchiffre}
                  error={errors.pchiffre}
                  id="pchiffre"
                  type="text"
                  className={classnames("", {
                    invalid: errors.pchiffre
                  })}
                />
                <label htmlFor="email">Premier chiffre</label>
                <span className="red-text">
                  {errors.pchiffre}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.opr}
                  error={errors.opr}
                  id="opr"
                  type="text"
                  className={classnames("", {
                    invalid: errors.opr
                  })}
                />
                <label htmlFor="password">Opérateur</label>
                <span className="red-text">
                  {errors.opr}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.dchiffre}
                  error={errors.dchiffre}
                  id="dchiffre"
                  type="text"
                  className={classnames("", {
                    invalid: errors.dchiffre
                  })}
                />
                <label htmlFor="password">Deuxieme Chiffre</label>
                <span className="red-text">
                  {errors.dchiffre}
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
                  onClick={this.onClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Calculer
                </button> <br /> <br />
                <PushSpinner
                size={30}
                color="#686769"
                loading={this.state.loading}
            />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Calculatrice.propTypes = {
  Calcul: PropTypes.func.isRequired,
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
  mapStateToProps,
  { Calcul }
)(withRouter(Calculatrice));