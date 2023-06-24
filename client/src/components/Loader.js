import { useState, CSSProperties } from "react";

import './Loader.css'

// import SquareLoader from "react-spinners/ClipLoader";

// const override = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//   };

//   const style = CSS`
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
//   `;
  

export default function Loader() {
    let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000");
    

  return (
    <div style={{marginTop:'150ppx'}}>
        <div className="sweet-loading text-center">

        <div className="loader">
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
</div>
     

      {/* <SquareLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={80}
      /> */}
    </div>
    </div>
  )
}
