import "./Footer.module.css";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.amazon_footer}>
      <div className={styles.back_to_top}>Back to top</div>

      <div className={styles.footer_links}>
        <div className={styles.footer_column}>
          <h4>Get to Know Us</h4>
          <ul>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Amazon</li>
            <li>Investor Relations</li>
            <li>Amazon Devices</li>
            <li>Amazon Science</li>
          </ul>
        </div>

        <div className={styles.footer_column}>
          <h4>Make Money with Us</h4>
          <ul>
            <li>Sell products on Amazon</li>
            <li>Sell on Amazon Business</li>
            <li>Sell apps on Amazon</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
            <li>Self-Publish with Us</li>
            <li>Host an Amazon Hub</li>
            <li>
              <a href="#">› See More Make Money with Us</a>
            </li>
          </ul>
        </div>

        <div className={styles.footer_column}>
          <h4>Amazon Payment Products</h4>
          <ul>
            <li>Amazon Business Card</li>
            <li>Shop with Points</li>
            <li>Reload Your Balance</li>
            <li>Amazon Currency Converter</li>
          </ul>
        </div>

        <div className={styles.footer_column}>
          <h4>Let Us Help You</h4>
          <ul>
            <li>Amazon and COVID-19</li>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Shipping Rates & Policies</li>
            <li>Returns & Replacements</li>
            <li>Manage Your Content and Devices</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      <div className={styles.footer_bottom}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
          className={styles.footer_logo}
        />
        <div className={styles.footer_options}>
          <button>🌐 English</button>
          <button>$ USD - U.S. Dollar</button>
          <button>🇺🇸 United States</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
