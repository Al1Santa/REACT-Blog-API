/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const Header = ({ categories, zenMode, setZenMode }) => (
  <header className="menu">
    <nav>
      {/* le composant link,  lors du click sur le lien,
      va venir ajouter une entrée dans l'historique du navigateur
      mais sans recharger la page */}
      {
        categories.map(
          (category) => (
            <NavLink
              key={category.label}
              className={
                ({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')
              }
              to={category.route}
            >
              {category.label}
            </NavLink>
          ),
        )
      }

      <button
        className="menu-btn"
        type="button"
        onClick={() => setZenMode(!zenMode)}
      >
        {zenMode ? 'Désactiver' : 'Activer'} Le mode zen
      </button>
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
  zenMode: PropTypes.bool.isRequired,
  setZenMode: PropTypes.func.isRequired,
};
export default Header;
