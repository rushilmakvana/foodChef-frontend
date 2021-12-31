import React from "react";

const Card = (props) => {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img src={props.iconurl} className="card-img-top icon-img" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            {props.name}
            {/* pakoda */}
          </h5>
          <p className="card-text">
            {/* Price : 50 */}
            {props.price} ₹
          </p>
          <a
            href={props.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Check Recipe
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
