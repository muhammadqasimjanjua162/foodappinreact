import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";
export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorinLoading, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  const fetchFood = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL);
      const json = await response.json();
      //  console.log(json, "json");
      setData(json);
      setFilteredData(json);
      setLoading(false);
    } catch (error) {
      setError("Unable to fetch data");
    }
  };
  useEffect(() => {
    fetchFood();
  }, []);
  console.log(data, "data");
  // fetchFood();
  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };
  const filteredFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };
  const filterBtns = [
    {
      name: "all",
      type: "all",
    },
    {
      name: "breakfast",
      type: "breakfast",
    },
    {
      name: "lunch",
      type: "lunch",
    },
    {
      name: "dinner",
      type: "dinner",
    },
  ];
  if (loading) return <div>Loading</div>;

  return (
    <>
      {" "}
      {errorinLoading ? (
        <h3>{errorinLoading}</h3>
      ) : (
        <Container>
          <TopContainer>
            <div className="logo">
              <img src="/logo.svg" alt="" />
            </div>
            <div className="search">
              <input onChange={searchFood} placeholder="search food ..." />
            </div>
          </TopContainer>
          <FilterContainer>
            {filterBtns.map((value) => (
              <Button key={value.name} onClick={() => filteredFood(value.type)}>
                {value.name}
              </Button>
            ))}
          </FilterContainer>
          <SearchResult data={filteredData} />
        </Container>
      )}
    </>
  );
};

export default App;
export const Container = styled.div`
  background-color: #323334;
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }
  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;
export const Button = styled.button`
  background: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
`;
const FoodCardContainer = styled.section`
  background: yellow;
  min-height: calc(100vh - 210px);
  background-image: url("./bg.png");
  background-size: cover;
`;
const FoodCards = styled.div``;
