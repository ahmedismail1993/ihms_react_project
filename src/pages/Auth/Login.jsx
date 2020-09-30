import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import { withTranslation } from "react-i18next";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { UserAuth } from "../../actions/user";
import { required, minLength } from "../../validations/index";
import { phoneRegex, emailRegex } from "../../utils/validate";
import { Link } from "react-router-dom";
class SignUp extends Component {
  state = {
    loading: false,
  };
  handleSubmit = (event, values) => {
    const formData = {
      payload: {
        ...values,
      },
      resource: "signin",
    };
    this.setState({ loading: true });
    this.props.UserAuth(formData).then(() => {
      this.setState({ loading: false });
    });
  };
  render() {
    const { t } = this.props;
    return (
      <main className="auth">
        <Container fluid>
          <Row className="full-height">
            <Col
              cols="12"
              md="6"
              sm="5"
              className="align-self-center mx-auto offset-md-1"
            >
              <Row>
                <Col cols="12" sm="10" className="mx-auto">
                  <div className="auth__right-side">
                    <AvForm onValidSubmit={this.handleSubmit}>
                      <Row>
                        <Col className="text-center" cols="12" sm="12">
                          <Logo />
                        </Col>
                        <Col className="text-center mb-3" cols="12" sm="12">
                          <h2 className="auth__right-side__title py-3">
                            {t("heading.signUp")}
                          </h2>
                        </Col>

                        <Col cols="12" sm="12">
                          <AvField
                            name="username"
                            label={t("form.email_or_phone")}
                            type="text"
                            validate={{
                              required: required(true, t, "email"),
                              pattern: {
                                value: emailRegex || phoneRegex,
                                errorMessage: t("validation.phone_or_email"),
                              },
                            }}
                          />
                          <p className="error-message">
                            {this.props.errors && this.props.errors["username"]}
                          </p>
                        </Col>
                        <Col cols="12" sm="12">
                          <AvField
                            name="password"
                            label={t("form.password")}
                            type="password"
                            validate={{
                              minLength: minLength(6, t, "password"),
                              required: required(true, t, "password"),
                            }}
                          />
                        </Col>
                        <Col cols="12" sm="12">
                          <Button
                            color="default"
                            className="auth__signUp-button"
                            type="submit"
                            block
                            size="lg"
                          >
                            {this.state.loading ? (
                              <Spinner />
                            ) : (
                              <span>{t("button.login")}</span>
                            )}
                          </Button>
                          <p className="text-center py-3 auth__have-account">
                            {t("heading.you__have_not_account")}
                            <Link to="/signUp">{t("button.signUp")}</Link>
                          </p>
                        </Col>
                      </Row>
                    </AvForm>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col className="d-none d-xl-block p-0" sm="6">
              <div className="auth__left-side"></div>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    errors: state.serverErrors.errors,
  };
};
export default connect(mapStateToProps, { UserAuth })(
  withTranslation()(SignUp)
);
