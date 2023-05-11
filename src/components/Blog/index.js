/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
// npm
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';

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

  // on prépare une variable d'état pour stocker no articles
  const [posts, setPosts] = useState([]);

  // on  prépare une variable d'état qui va indiquer
  // si on est en état de chargement ou NotFound
  const [loading, setLoading] = useState(false);

  // fonction permettant de récupérer lse articles
  const loadPosts = () => {
    console.log('on charge les articles');

    //  On passe en état loading
    setLoading(true);
    // on simule la latence d'appel de l'api
    // en programmant l'execution d'une fonction au bout de seconde
    setTimeout(
      // fonction exécuté au bout de XX ms
      () => {
        console.log('articles chargé');
        //  on veut mettre à jour la liste des articles dans le useState
        //  Pour simuler qu'on a eu la réponse de l'api et qu'on ll'a traité
        // on fait un nouveau rendu ( qui ne change rien car récup depuis le fichier de données)
        setPosts(postsData);
        //  ici on sort de l'état de chargement
        // on ne va plus afficher le Spinner mais le routes utilisants
        // les articles qui sont maintenant dans le state
        setLoading(false);
      },
      // temps en millisecondes avant lequel la fonction se déclenche
      2000,
    );
    console.log('fin de la fonction loadPosts');
  };

  // console.log(categoriesData);
  // console.log(postsData);

  return (
    <div className="blog">
      <Header categories={categoriesData} zenMode={isZenMode} setZenMode={setIsZenMode} />
      <button type="button" onClick={loadPosts}>Récupérer les articles</button>
      {loading && <Spinner />}
      {!loading && (
        <Routes>
          {categoriesData.map(
            (category) => (
              <Route
                key={category.route}
                path={category.route}
                element={(
                  <Posts
                    posts={getPostsByCategory(posts, category.label)}
                    zenMode={isZenMode}
                  />
                )}
              />
            ),
          )}
          {/* le composant permet d'établir une redirection vers un autre chemin */}
          <Route path="/jquery" element={<Navigate to="/autre" />} />

          {/* on crée une route qui va afficher une 404
          si aucune corespondance entre une URL demandée et une route définit n'est déjà trouvé */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
};
// == Export
export default Blog;
