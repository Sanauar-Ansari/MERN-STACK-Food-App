import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log(response[0], response[1]);
    setFoodItem(response[0]);
    setFoodCategory(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleCaptions"
          className="carousel slide "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-item active">
              <img
                src="https://www.awesomecuisine.com/wp-content/uploads/2007/10/Chicken-Biryani_resized.jpg"
                className="d-block w-100 imageSecond"
                alt="..."
                style={{ filter: "brightness(50%)", objectFit: "inherit" }}
              />
              {/* ******************* */}
              <div className="carousel-caption">
                <div className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search your favourite food here..."
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* ************* */}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* 1st all the data will be stored in response then only card will be rendered */}
        {foodCategory.length ? (
          foodCategory.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />

                {foodItem.length ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filtereditem) => {
                      return (
                        <div
                          key={filtereditem._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            options={filtereditem.options[0]}
                            foodItem={filtereditem}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>no such data</div>
                )}
              </div>
            );
          })
        ) : (
          <div>'''''''''''''''''''''''''''</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
