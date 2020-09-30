import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ProductCard from '../../components/Cards/Product/index';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import { IndexData } from '../../api/index';
import CategoryFilter from './CategoryFilter';

function Products({ t, history }) {
  const [productsState, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collapseSate, setCollapse] = useState([]);
  const [searchName, setSearchName] = useState(null);
  const [pagination, setPagination] = useState({});
  const [queries, setQueries] = useState({});
  const product = productsState.map((product, index) => (
    <Col className="mb-3" xs="12" sm="6" md="4" lg="3" key={index}>
      <ProductCard product={product} t={t} />
    </Col>
  ));
  const searchQueries = new URLSearchParams(history.location.search);
  const handleFilter = (e) => {
    const query = {};
    query['name'] = e.target.value;
    if (searchQueries.get('category_id')) {
      query['category_id'] = searchQueries.get('category_id');
    }
    if (e.key == 'Enter') {
      if (e.target.value !== '') {
        history.push({
          search: `${new URLSearchParams(query).toString()}`,
        });
      }
    }
  };
  const clearFilter = (e) => {
    if (history.location.search !== '') {
      history.push({ search: '' });
    }
  };
  const onInputChange = (e) => {
    setSearchName(e.target.value);
  };
  const handleGetProducts = () => {
    const nameParam = searchQueries.get('name');

    setQueries((value) => {
      value['name'] = nameParam;
      value['category_id'] = searchQueries['category_id'];
    });
    setSearchName(nameParam);
    IndexData({ resource: 'products', query: queries }).then((res) => {
      const { products, meta } = res.data;
      setProducts(products);
      setPagination(meta);
    });
  };
  const handleGetCategories = () => {
    IndexData({ resource: 'categories?roots' }).then((res) => {
      const { categories } = res.data;
      categories.forEach(() => {
        setCollapse((value) => {
          return (value = [...value, false]);
        });
      });
      setCategories(categories);
    });
  };
  const handleToggle = (index) => {
    let newState = [...collapseSate];
    newState[index] = !newState[index];
    setCollapse(newState);
    console.log(collapseSate);
  };
  useEffect(() => {
    handleGetProducts();
    handleGetCategories();
  }, []);

  return (
    <main className="products">
      <Container fluid>
        <Row>
          <Col xs="12" lg="2">
            {categories.map((category, index) => (
              <CategoryFilter
                category={category}
                key={index}
                isOpen={collapseSate[index]}
                toggle={() => handleToggle(index)}
                history={history}
              />
            ))}
          </Col>
          <Col xs="12" lg="10">
            <Row>
              <Col xs="12" className="mb-5">
                <Row>
                  <Col xs="12" md="4">
                    <Input
                      name="name"
                      value={searchName}
                      onKeyPress={handleFilter}
                      onChange={onInputChange}
                      className="products__search-input"
                      placeholder={t('labels.search_product')}
                    />
                  </Col>
                  <Col xs="12" md="12" className="mt-5">
                    <Button
                      className="clear-button default"
                      onClick={clearFilter}
                    >
                      {t('button.clear_all')}
                    </Button>
                  </Col>
                </Row>
              </Col>
              {product}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
export default withRouter(withTranslation()(Products));
