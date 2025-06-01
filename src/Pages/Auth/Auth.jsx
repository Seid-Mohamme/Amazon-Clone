import { useState, useContext } from "react";
import styles from "./Signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../../src/Utility/Firebase";
import { Type } from "../../../src/Utility/Action.Type";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  // event handler
  const navigate = useNavigate();
  const navStateData = useLocation(); // ✅ THIS FIXES YOUR ERROR
  const authHandler = (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (e.target.name === "signIn") {
      // we do sign in related
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          dispatch({
            type: Type.SET_USER,
            user: userCredential.user,
          });
          setLoading({ ...loading, signIn: false });
          setError("");
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          // console.log(err)
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      // create new account
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          dispatch({
            type: Type.SET_USER,
            user: userCredential.user,
          });
          setError("");
          setLoading({ ...loading, signUp: false });
          navigate("/");
        })
        .catch((err) => {
          // console.log(err);
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };
  return (
    <section className={styles.login}>
      {/* logo */}
      <Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>

      {/* form */}
      <div className={styles.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}

        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            {/* an controlled input */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={styles.login_signinbutton}
          >
            {loading.signIn ? (
              <ClipLoader color="white" size={25} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        {/* Agreement */}
        <p>
          {" "}
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {/* create account button */}
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={styles.login_registerbutton}
        >
          {loading.signUp ? (
            <ClipLoader color="white" size={25} />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>
        {/* Error comes from Firebase */}
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
