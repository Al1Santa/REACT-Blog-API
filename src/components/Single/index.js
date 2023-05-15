import { Navigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import NotFound from '../NotFound';
import './single.scss';


function Single({ posts }) {
  const params = useParams();
  const { slug } = params;
  console.log(slug);

  console.log(posts);

  const singlePost = posts.find((post) => post.slug === slug);

  if (!singlePost) {
    // return <Navigate to="/" />;
    return <NotFound />;
  }

  console.log(singlePost);

  const { title, content, category } = singlePost;

  return (
    <article className="single">
      <h2 className="single-title">{title}</h2>
      <div className="single-category">{category}</div>
      <p className="single-content">{content}</p>
    </article>
  );
}

Single.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
// == Export
export default Single;
