/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */

import Post from 'src/components/Post';
import PropTypes from 'prop-types';
import './styles.scss';

const Posts = ({ posts }) => (
  <main className="posts">
    <h1 className="posts-title">Dev Of Game</h1>
    <div className="posts-list">
      {
        posts.map((post) => <Post key={post.id} {...post} />)
      }
    </div>
  </main>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
export default Posts;
