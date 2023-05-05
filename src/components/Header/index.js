/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import PropTypes from 'prop-types';
import './styles.scss';

const Header = ({ categories }) => (
  <header className="menu">
    <nav>
      {categories.map(
        (category) => <a key={category.label} className="menu-link" href="{category.route}">{category.label}</a>,
      )}

      <button className="menu-btn" type="button">Activer le mode zen</button>
    </nav>
  </header>
);

Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}
export default Header;
