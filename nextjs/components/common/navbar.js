import Link from "next/link";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarInner}>
        {" "}
        <Link href={"/homepage"}>
          <img
            src="/Login-UI/UtexasLogo.png"
            alt="Login Image"
            className={styles.logo}
          />
        </Link>
        <div className={styles["loginWrapper"]}>
          <img
            className={styles.login}
            alt="login icon"
            src="/homepage-UI/log_in.png"
          />
          <p className={styles["loginText"]}>Login</p>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
