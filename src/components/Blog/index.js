/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */

// Npm
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';
import Single from 'src/components/Single';

// data, styles et utilitaires
import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

// == Composant
const Blog = () => {
  const getPostsByCategory = (posts, categoryName) => {
    // On n'oublie pas de gérer la catégorie "Accueil"
    // => On veut pouvoir voir tous les articles sur la page d'accueil
    if (categoryName === 'Accueil') {
      return posts;
    }

    // Depuis le tableau, on veut recup les articles d'une catégorie donnée
    const filteredPosts = posts.filter((post) => post.category === categoryName);
    return filteredPosts;
  };

  const [isZenMode, setIsZenMode] = useState(false);

  // On prépare une variable d'état pour stocker nos articles
  const [posts, setPosts] = useState([]);

  // On prépare une variable d'état qui va indiquer
  // si on est en état de chargement ou non
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Quand on ne passe qu'un seul argument à useEffect,
  // la callback passée à useEffect est executée
  // au montage et au re-rendu du composant.
  // ça revient componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log('Execution de useEffect au montage + à l`\'update du composant');
  });

  // Quand on passe en second argument un tableau de dépendance vide [],
  // la callback passée à useEffect est executée
  // seulement au montage du composant
  // Revient à componentDidMount
  useEffect(() => {
    console.log('J\'aimerais m\'executer seulement au moment du montage du composant');
  }, []);

  // Quand on passe un dépendance dans le tableau en second argument,
  // la callback va être executée au montage et après le nouveau rendu
  // SEULEMENT SI la dépendance renseignée change (ici: isZenMode)
  useEffect(() => {
    console.log("Je m'execute après le montage du composant et après le nouveau rendu si isZenMode change");
  }, [isZenMode]);

  /*
  En résumé :
  useEffect(() => {}); // après tous les rendu
  useEffect(() => {}, []); // uniquement au rendu initial
  useEffect(() => {}, [toto, tata]);
  => après le rendu initial et les nouveaux rendus si  toto et/ou tata change(nt)
  */

  // Fonction permettant de recup les articles
  const loadPosts = () => {
    // On passe en état loading : on affiche donc le Spinner
    setLoading(true);

    // On va faire la call à l'API
    axios
      .get('https://oclock-open-apis.vercel.app/api/blog/posts')
      .then((response) => {
        // Handler/callback executée quand la promesse est tenue
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

    console.log('c - Fin de la fonction loadPosts');
  };

  // Fonction permettant de recup les categories
  const loadCategories = () => {
    setLoadingCategories(true);
    axios
      .get('https://oclock-open-apis.vercel.app/api/blog/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => {
        console.log('Problème lors du contact avec l\'API');
      })
      .finally(() => {
        setLoadingCategories(false);
      });
  };

  useEffect(() => {
    loadCategories();
    loadPosts();
  }, []);

  return (
    <div className="blog">
      {(loading || loadingCategories) && <Spinner />}
      {(!loading && !loadingCategories) && (
        <>
          <Header categories={categories} zenMode={isZenMode} setZenMode={setIsZenMode} />
          <Routes>
            {categories.map(
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

            {
              // On définit une route qui va matcher sur les url : /post/slug-du-post
              // Si l'url demandée est de cette forme, on va rendre un composant Single
              // On va transmettre à ce composant l'ensemble des articles
              // Il fera en sorte de retrouver le bon en fonction du slug présent dans l'URL
            }
            <Route path="/post/:slug" element={<Single posts={posts} />} />
            {
              // Le composant Navigate permet d'établir une redirection vers un autre chemin
            }
            <Route path="/jquery" element={<Navigate to="/autre" />} />
            {
              // On crée une route qui va afficher une 404
              // si aucune correspondance entre une URL demandée et une route définit
              // n'est déjà trouvé
            }
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

// == Export
export default Blog;
