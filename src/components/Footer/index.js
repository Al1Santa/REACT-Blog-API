import './styles.scss';

const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <footer className="copyright">
      DevOfGame, le blog du développeur React/symfony - {year} ©
    </footer>
  );
};

export default Footer;
