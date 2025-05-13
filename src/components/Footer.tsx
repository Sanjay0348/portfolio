
import '../assets/styles/Footer.scss'
import { GitHub,LinkedIn } from "@mui/icons-material";
function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/Sanjay0348" target="_blank" rel="noreferrer"><GitHub/></a>
        <a href="https://www.linkedin.com/in/sanjay-venkat0348" target="_blank" rel="noreferrer"><LinkedIn/></a>
      </div>
      <p>A portfolio built by <a href="https://www.linkedin.com/in/sanjay-venkat0348" target="_blank" rel="noreferrer">Sanjay</a> ♥️ </p>
    </footer>
  );
}

export default Footer;