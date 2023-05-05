/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */

import Post from 'src/components/Post';
import PropTypes from 'prop-types';
import './styles.scss';

const Posts = ({ posts, zenMode }) => {
  // on se base sur la valeur de notre variable d'état pour construire le css
  let cssClass = 'posts';
  if (zenMode) {
    cssClass += 'post--zen';
  }

  return (
    <main className={cssClass}>
      <h1 className="posts-title">Dev Of Game</h1>
      <div className="posts-list">
        {
          posts.map((post) => <Post key={post.id} {...post} />)
        }
      </div>
    </main>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  zenMode: PropTypes.bool.isRequired,
};
export default Posts;
