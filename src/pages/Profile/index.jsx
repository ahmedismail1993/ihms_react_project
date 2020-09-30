import React from 'react';
import SideBar from '../../components/SideBar/index';
import { Container, Row, Col } from 'reactstrap';
function Profile({ children }) {
  return (
    <div className="profile">
      <Container fluid>
        <Row>
          <Col xs="12" lg="2" className="mx-auto">
            <SideBar />
          </Col>
          <Col xs="12" lg="10">
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Profile;
