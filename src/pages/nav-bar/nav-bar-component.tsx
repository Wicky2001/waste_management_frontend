import { Link } from "react-router-dom";
import menuItems from "./menue";
import styles from "./nav-bar-component.module.scss";

const NavBar = () => {
  return (
    <nav className={styles.mainContainer}>
      <div className={styles.logoArea}>
        <span className={styles.menuTitle}>Menu</span>
      </div>

      <ul className={styles.linksList}>
        {menuItems.map((item) => (
          <li key={item.name} className={styles.linkItem}>
            <Link
              to={item.url}
              className={`${styles.navLink} ${location.pathname === item.url ? styles.active : ""}`}
            >
              <span className={styles.icon}>⊞</span>
              <span className={styles.linkText}>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
