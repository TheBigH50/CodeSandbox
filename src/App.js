import { useState, useEffect, useRef } from "react";
import getFlag from "./helpers/getFlag";

/* This was used in step 2 to retrieve the DOM Tree URL:

const branchWalker = document.querySelectorAll("section > main > article > p");
const url = [];
branchWalker.forEach((a) => {
  const tempVal = a.getAttribute("value");

  url.push(tempVal);
});
console.log(url.join("")); */

function App() {
  const [flag, setFlag] = useState([]);
  const [timedFlag, setTimedFlag] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const initialRender = useRef(true);
  let i = useRef(0);

  useEffect(() => {
    let clean = true;
    initialRender.current = !initialRender.current;
    if (!initialRender.current && clean) {
      getFlag(setFlag, setLoaded);
    }
    return () => (clean = !clean);
  }, []);

  useEffect(() => {
    function addLetter() {
      if (i.current < flag.length) {
        setTimedFlag([...timedFlag, flag[i.current]]);
        i.current = i.current + 1;
      }
    }

    const timeId = setTimeout(addLetter, 500);

    return () => {
      clearTimeout(timeId);
    };
  }, [flag, timedFlag]);

  if (!loaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <ul>
          {timedFlag.map((a) => {
            return <li key={a}>{`${a}`}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
