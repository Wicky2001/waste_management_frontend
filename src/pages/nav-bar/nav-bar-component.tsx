import { Link, useLocation, useNavigate } from "react-router-dom";
import { Power } from "lucide-react";
import menuItems from "./menue";
import styles from "./nav-bar-component.module.scss";
import { useAuth } from "../../common-shared/auth/auth-context";
import { logout } from "../../common-shared/service/apiClient";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles?.length) {
      return true;
    }

    if (!user?.role) {
      return false;
    }

    return item.roles.includes(user.role);
  });

  const handleLogout = async () => {
    try {
      await logout();
      setUser({ isAuthenticated: false, role: null });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setUser({ isAuthenticated: false, role: null });
      navigate("/login", { replace: true });
    }
  };

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

      <div className={styles.logoutArea}>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
          title="Logout"
        >
          <Power size={18} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;