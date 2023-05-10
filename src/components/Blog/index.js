/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
// npm
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  const getPostsByCategory = (posts, categoryName) => {
    // on veut récupérer les articles d'une categorie donnée
    if (categoryName === 'Accueil') {
      return posts;
    }

    const filteredPosts = posts.filter((post) => post.category === categoryName);
    return filteredPosts;
  };

  const [isZenMode, setIsZenMode] = useState(false);

  // console.log(categoriesData);
  // console.log(postsData);

  return (
    <div className="blog">
      <Header categories={categoriesData} zenMode={isZenMode} setZenMode={setIsZenMode} />
      <Routes>
        {categoriesData.map(
          (category) => (
            <Route
              key={category.route}
              path={category.route}
              element={(
                <Posts
                  posts={getPostsByCategory(postsData, category.label)}
                  zenMode={isZenMode}
                />
              )}
            />
          ),
        )}
      </Routes>
      <Footer />
    </div>
  );
};
// == Export
export default Blog;
