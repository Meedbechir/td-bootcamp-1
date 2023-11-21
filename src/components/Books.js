import React from "react";

const Books = ({ title, author, description }) => {
 

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <h5 className="card-title">{author}</h5>
        <p className="card-title">{description}</p>
      </div>
    </div>
  );
}

export default Books;
