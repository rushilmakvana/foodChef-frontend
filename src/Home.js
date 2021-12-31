import React, { useEffect, useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
import LoadingBar from "react-top-loading-bar";
import { Link } from "react-router-dom";
const Home = () => {
  const [state, setstate] = useState([]);
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const fetchrecipe = () => {
    setProgress(30);
    fetch("http://127.0.0.1:4000/fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setProgress(70);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setstate(data.data);
      });
    setProgress(100);
    // const data = await res.json();
    // console.log("data = ", data);
    // setstate(data.data);
  };
  useEffect(() => {
    fetchrecipe();
  }, []);
  return (
    <>
      <Navbar />
      <LoadingBar
        color="white"
        progress={progress}
        onLoaderFinished={() => {
          setShow(true);
          setProgress(0);
        }}
      />
      <div className="container pt-5">
        {state.length === 0 && (
          <div className="add-btn">
            <div className="add-text">
              <h5>No Food items found</h5>
            </div>
            <Link to={"/add"}>
              <button type="submit" className="btn btn-primary">
                Add Food item
              </button>
            </Link>
          </div>
        )}
        {/* <Card />
        <Card />
        <Card />
        <Card /> */}
        <div className="row">
          {show &&
            state &&
            state.map((e, i) => {
              return (
                <div className="col-md-4 my-3" key={i}>
                  <Card
                    name={e.name}
                    price={e.price}
                    url={e.url}
                    iconurl={e.icon}
                  />
                </div>
              );
            })}
        </div>
      </div>
      {/* <h1>home</h1> */}
    </>
  );
};

export default Home;
