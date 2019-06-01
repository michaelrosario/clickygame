import React from "react";
import "./style.css";

function Card(props) {

  const {
    image,
    clickCard
  } = props;

  var sectionStyle = {
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${image})`
  };

  return (
    <div className="card" onClick={e => clickCard( e, props.id )} style={ sectionStyle }>
      {/* selected ? "SELECTED" : "" */}
    </div>
  );
}

export default Card;
