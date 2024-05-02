import React, { useState, useEffect } from "react";

import Footer from "../components/Footer";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
// import Carousel from "../components/Carousel";
// import { json } from "react-router";

export default function Home() {
  const [Fooddata, setFooddata] = useState([]);
  const [Categorydata, setCategorydata] = useState([]);
  const [Search, setSearch] = useState("")

  const loadData = async () => {
    let response = await fetch("https://foody-pie.onrender.com/api/getfooddata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log(response)
    return response;
  };
  useEffect(() => {
    loadData().then((data) => {
      setCategorydata(data[1]);
      setFooddata(data[0]);
    });
  }, []);
  return (
    <div>
      <div>
        <Navbar/>
      </div>


      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption " style={{ zIndex: "1" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value = {Search}
                  onChange={(e)=>setSearch(e.target.value)}
                />
                {/* <button
                  className="btn btn-outline-info text-white bg-danger bg-gradient"
                  type="submit"
                  onSubmit={}
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                style={{ filter: "Brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?biryani"
                className="d-block w-100"
                style={{ filter: "Brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pizza"
                className="d-block w-100"
                style={{ filter: "Brightness(30%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>


      <div className="container">
        {Categorydata != []
          ? Categorydata?.map((categ,index) => {

              return (
                <div className="row mb-3" key={index}>
                  <div key={categ.id} className="fs-3 m-3">
                    {categ.CategoryName}
                  </div>
                  <hr />

                  {Fooddata?.filter(
                    (data) => (data.CategoryName == categ.CategoryName && data.name.toLowerCase().includes(Search.toLowerCase()))
                  ).map((filteritem) => {
                    const { id,name, img, options, description } = filteritem;
                    return (
                      <div
                        key={filteritem.id}
                        className="col-12 col-md-6 col-lg-3 m-2"
                      >
                        <Card
                          items = {filteritem}
                          options={options[0]}
                          
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })
          : ""}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
