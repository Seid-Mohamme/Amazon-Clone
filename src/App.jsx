import { useContext, useEffect } from "react";
import "./App.css";
import Routing from "./Routing";
import { DataContext } from "./DataProvider/DataProvider";
import { Type } from "./Utility/Action.Type";
import { auth } from "./Utility/Firebase";
function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser, "from firebase");
      if (authUser) {
        console.log(authUser, "from in");
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        console.log(authUser, "from null");
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
