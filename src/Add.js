import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { storage } from "./Firebase";
import Navbar from "./Navbar";
import loading from "./loader2.gif";
import $ from "jquery";
const Add = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [icon, setIcon] = useState("");
  const [loader, setLoader] = useState(false);
  // const [p, setP] = useState(0);
  const handlesubmit = async () => {
    if (name && url && price && icon) {
      // $(".error").slideUp();
      setLoader(true);
      const storageref = ref(
        storage,
        `/images/${icon.name.split(".")[0]}_${Date.now()}.${icon.name
          .split(".")
          .pop()}`
      );
      const task = uploadBytesResumable(storageref, icon);
      await task.on(
        "state_changed",
        (ss) => {
          // const prog = Math.round((ss.bytesTransferred / ss.totalBytes) * 100);
          // setP(prog);
          // console.log("progress = ", prog);
        },
        (err) => console.log("err"),
        () => {
          getDownloadURL(task.snapshot.ref).then((uri) => {
            console.log("url =", uri);
            fetch("http://127.0.0.1:4000/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name,
                price: Number(price),
                url: url,
                icon: uri,
              }),
            })
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                setLoader(false);
                console.log("data = ", data);
                window.location.href = "/";
              });
          });
        }
      );
    } else {
      $(".error").slideDown();
    }
  };
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="error">
            <i className="fas fa-times"></i> <span>Fill all the fields</span>
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              name of Dish
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputText1"
              aria-describedby="emailHelp"
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  document
                    .querySelector("#exampleInputText1")
                    .classList.add("red");
                } else {
                  document
                    .querySelector("#exampleInputText1")
                    .classList.remove("red");
                }
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputText2"
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  document
                    .querySelector("#exampleInputText2")
                    .classList.add("red");
                } else {
                  document
                    .querySelector("#exampleInputText2")
                    .classList.remove("red");
                }
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Recipe url
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputText3"
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  document
                    .querySelector("#exampleInputText3")
                    .classList.add("red");
                } else {
                  document
                    .querySelector("#exampleInputText3")
                    .classList.remove("red");
                }
                setUrl(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleInputText"
              onChange={(e) => {
                setIcon(e.target.files[0]);
                console.log("icon = ", e.target.files[0]);
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary my-3"
            onClick={handlesubmit}
          >
            {loader && <img src={loading} width={"25px"} alt="" />}
            {!loader && <span>Submit</span>}
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;
