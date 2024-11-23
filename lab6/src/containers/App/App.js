import React from "react";
import Layout from "./Layout/layout";
import Footer from "./Footer/Footer";
import Home from "./Home/home";
import efsPicture from "../../../../7_8_lab/src/Icons/efs.png";
import ss3Picture from "../../../../7_8_lab/src/Icons/s3.png";
import ebsPicture from "../../../../7_8_lab/src/Icons/ebs.png";

const data = [
  {
    title: "EFS",
    text: "Elastic File Storage",
    image: efsPicture,
    price: 1000,
  },
  {
    title: "S3",
    text: "Simple Storage Service",
    image: ss3Picture,
    price: 4000,
  },
  {
    title: "EBS",
    text: "Elastic Black Storage",
    image: ebsPicture,
    price: 2500,
  },
];


const App = () => {
  return (
    <div>
    <Layout/>
    <Home data={data}/>
    <Footer/>
    </div>
  );
};

export default App;
