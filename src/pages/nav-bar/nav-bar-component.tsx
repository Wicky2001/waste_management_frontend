import { Link, useLocation } from "react-router-dom";
import menuItems from "./menue";
import styles from "./nav-bar-component.module.scss";
import { useAuth } from "../../common-shared/auth/auth-context";

const NavBar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles?.length) {
      return true;
    }

    if (!user.role) {
      return false;
    }

    return item.roles.includes(user.role);
  });

  return (
    <nav className={styles.mainContainer}>
      <div className={styles.logoArea}>
        <span className={styles.menuTitle}>Menu</span>
      </div>

      <ul className={styles.linksList}>
        {filteredMenuItems.map((item) => (
          <li key={item.name} className={styles.linkItem}>
            <Link
              to={item.url}
              className={`${styles.navLink} ${location.pathname === item.url ? styles.active : ""}`}
            >
              <span className={styles.icon}>
                <item.Icon />
              </span>
              <span className={styles.linkText}>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
