/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import './styles.scss';

const Post = ({ title, category, excerpt }) => {
  // On va demandé a DOMpurify de nettoyer le HTML reçu depuis l'API
  // on a la possibilité d'affiner notre nettoyage en spécifiant
  // les balises et ou attributs autorisé, le reste des balises ne sera pas interpréter
  const cleanExcerpt = DOMPurify.sanitize(excerpt, { ALLOWED_TAGS: ['strong', 'em'] });
  function createMarkup() {
    return { __html: cleanExcerpt };
  }

  return (
    <article className="post">
      <h2 className="post-title">{title}</h2>
      <div className="post-category">{category}</div>
      <p className="post-excerpt" dangerouslySetInnerHTML={createMarkup()} />
    </article>
  );
};

Post.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};
export default Post;
