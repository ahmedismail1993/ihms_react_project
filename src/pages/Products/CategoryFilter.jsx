import React from 'react';
import { Collapse, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { ReactComponent as DownArrow } from '../../assets/images/down-arrow.svg';
import { ReactComponent as UpArrow } from '../../assets/images/up-arrow.svg';
import { Link } from 'react-router-dom';
const CategoryFilter = ({ isOpen, toggle, category, history }) => {
  let nameQuery = new URLSearchParams(history.location.search).get('name');
  const query = {};
  if (nameQuery) {
    query['name'] = nameQuery;
  }
  const category_id = new URLSearchParams(history.location.search).get(
    'category_id'
  );
  return (
    <div className="category">
      <Button
        className="toggle-button"
        color="primary"
        onClick={toggle}
        style={{ marginBottom: '1rem' }}
      >
        <span> {category.name}</span>
        {isOpen ? (
          <DownArrow className="toggle-icon" />
        ) : (
          <UpArrow className="toggle-icon" />
        )}
      </Button>
      <Collapse isOpen={isOpen}>
        <ListGroup>
          {category.childs.map((child, index) => (
            <Link
              to={{
                pathname: 'products',
                search: `${new URLSearchParams({
                  category_id: child.id,
                  ...query,
                }).toString()}`,
              }}
            >
              <ListGroupItem
                className={category_id == child.id && 'active-category'}
                key={index}
              >
                {child.name}
              </ListGroupItem>
            </Link>
          ))}
        </ListGroup>
      </Collapse>
    </div>
  );
};

export default CategoryFilter;
