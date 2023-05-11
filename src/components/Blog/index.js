/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
// npm
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

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

  // la callBack  passé à uiseEffect est exécutée
  // au montage et au re-rendu du composant ça revient =>
  // componentDidMount + componentDidUpdate
  // useEffect(() => {
  //   console.log('execution de useEffect');
  // }, []);

  /*
    En résumé :
    useEffect(() => {}); // après tous les rendu
    useEffect(() => {}, []); // uniquement au rendu initial
    useEffect(() => {}, [toto, tata]);
    => après le rendu initial et les nouveaux rendus si  toto et/ou tata change(nt)
  */

  // fonction permettant de récupérer lse articles
  const loadPosts = () => {
    console.log('on charge les articles');

    //  On passe en état loading
    setLoading(true);

    // on va faire l'appel à l'API
    axios
      .get('https://oclock-open-apis.vercel.app/api/blog/posts')
      .then((response) => {
        // Handler/callback executée quand la promesse est tenue
        console.log('b - Promesse tenue');
        console.log(response.data);
        setPosts(response.data);
      })
      .catch(() => {
        // Handler/callback executée quand la promesse est rompue
        console.log('Problème lors du contact avec l\'API');
      })
      .finally(() => {
        // Handler executé quand on reçoit une réponse
        // que la promesse ait été tenue ou rompu

        // On passe la variable d'état loading à false
        // pour re-rendre notre composant sans le Spinner
        setLoading(false);
      });

    console.log('fin de la fonction loadPosts');
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // console.log(categoriesData);
  // console.log(postsData);

  return (
    <div className="blog">
      <Header categories={categoriesData} zenMode={isZenMode} setZenMode={setIsZenMode} />
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
