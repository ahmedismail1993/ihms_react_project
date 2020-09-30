import React, { useState, useEffect } from 'react';
import { logout } from '../../actions/user';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as User } from '../../assets/images/account.svg';
import { ReactComponent as Mode } from '../../assets/images/mode.svg';
import { withTranslation } from 'react-i18next';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  ButtonDropdown,
} from 'reactstrap';

const HeaderNavbar = ({ t, token, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);
  const [scrolledNavbar, setScrolled] = useState(false);
  const toggleDropdown = () => setOpen(!dropdownOpen);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  });
  const changeModeThem = () => {
    if (cookie.get('theme') == 'dark') {
      cookie.set('theme', 'light');
    } else {
      cookie.set('theme', 'dark');
    }
    window.location.reload();
  };
  const locale = cookie.get('locale');
  const lang = locale === 'ar' ? 'en' : 'ar';
  const languages = {
    ar: t('navbar.arabic'),
    en: t('navbar.english'),
  };
  const navLinks = [
    { title: t('navbar.home'), to: '/' },
    { title: t('navbar.services'), to: '/services' },
    { title: t('navbar.categories'), to: '/categories' },
    { title: t('navbar.products'), to: '/products' },
    { title: t('navbar.news'), to: '/news' },
    { title: t('navbar.galleries'), to: '/galleries' },
    { title: t('navbar.members'), to: '/members' },
  ];
  const dynamicLink = navLinks.map((el, index) => (
    <NavItem className="px-4" key={index}>
      <NavLink exact to={el.to}>
        {el.title}
      </NavLink>
    </NavItem>
  ));
  const toggle = () => setIsOpen(!isOpen);
  const changeLocale = () => {
    cookie.set('locale', lang);
    window.location.reload();
  };
  const handleLogout = () => {
    logout();
  };
  return (
    <main className="nav-header ">
      <Navbar
        color="faded"
        light
        expand="md"
        className={{ 'scrolled-navbar': scrolledNavbar }}
      >
        <Container>
          <NavLink className="navbar-brand" to="/">
            <Logo />
          </NavLink>

          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar className="mx-auto">
              {dynamicLink}
              <NavItem />
            </Nav>
            {token ? (
              <ButtonDropdown
                className="nav-header__button--dropdown"
                isOpen={dropdownOpen}
                toggle={toggleDropdown}
              >
                <DropdownToggle>
                  {' '}
                  <User className="nav-header__button--logo" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <Link to="/profile">{t('heading.profile')}</Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={handleLogout}>
                    {t('button.logout')}
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            ) : (
              <Link to="/signUp" className="nav-header__button">
                <User className="nav-header__button--logo" />
                <span>{t('button.signUp')}</span>
              </Link>
            )}
            <Mode
              onClick={changeModeThem}
              style={{ height: '3rem', cursor: 'pointer' }}
            />
            <Nav navbar className={locale === 'ar' ? 'mr-auto' : 'ml-auto'}>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {languages[locale]}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={changeLocale}>
                    {' '}
                    {languages[lang]}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </main>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token,
  };
};
export default connect(mapStateToProps, { logout })(
  withTranslation()(HeaderNavbar)
);
