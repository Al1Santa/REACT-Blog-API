/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
// npm
import { useState } from 'react';
// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';

// data, styles et utilitaires
import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

// == Composant
const Blog = () => {
  const [isZenMode, setIsZenMode] = useState(false);

  // console.log(categoriesData);
  // console.log(postsData);

  return (
    <div className="blog">
      <Header categories={categoriesData} zenMode={isZenMode} setZenMode={setIsZenMode} />
      <Posts posts={postsData} zenMode={isZenMode} />
      <Footer />
    </div>
  );
};
// == Export
export default Blog;
