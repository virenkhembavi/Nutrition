import React, { Component } from 'react'

export default class Food extends Component {

    constructor(props) {
        super(props);

        this.state = {
            foods: [],
            searchedFoods: [],
            currentFood: {
                name: "-",
                protein: 0,
                calories: 0,
                carbs: 0,
                fats: 0,
                fiber: 0,
                weight: 0
            }

        }
    }

    calculateChanges(weight) {
        let currFood = this.state.currentFood;
        if (weight !== "" && weight !== 0) {




            currFood.calories = Number(currFood.calories * weight) / currFood.weight;
            currFood.carbs = Number(currFood.carbs * weight) / currFood.weight;
            currFood.protein = Number(currFood.protein * weight) / currFood.weight;
            currFood.fats = Number(currFood.fats * weight) / currFood.weight;
            currFood.fiber = Number(currFood.fiber * weight) / currFood.weight;
            currFood.weight = Number(weight);

            this.setState({ currentFood: currFood });
            console.log(currFood)
        } else {
            this.setState({ currentFood: currFood });
        }
    }
    selectFood(food) {
        this.setState({ currentFood: food });
    }
    searchFood(value) {
        // console.log(value)
        if (value !== "") {
            let searchedArray = this.state.foods.filter((food, index) => {
                return food.name.toLowerCase().includes(value.toLowerCase());
            })

            this.setState({ searchedFoods: searchedArray });

        } else {

            this.setState({ searchedFoods: [] });
        }

    }


    componentDidMount() {

        fetch("http://localhost:8000/foods")
            .then((res => res.json()))
            .then((foodsResponse) => {
                this.setState({ foods: foodsResponse.foods })
                // console.log(foods)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    render() {
        return (
            <div className="food">

                <div className="container">
                    <div className="form-group" style={{ marginTop: "20px" }}>
                        <input type="text" className="form-control" placeholder="Search" onChange={(e) => {
                            this.searchFood(e.target.value)
                        }} />
                    </div>
                    <div className="search-result">
                        {
                            this.state.searchedFoods.map((food, index) => (

                                <div className="result" style={{ cursor: "pointer", padding: "6px" }} onClick={() => {
                                    this.selectFood(food);
                                }} key={index}>
                                    {food.name}
                                </div>
                            ))

                        }


                    </div>
                    <div className="product-display">
                        <table className="table">
                            <thead>

                                <tr>
                                    <td>Name</td>
                                    <td>protein</td>
                                    <td>calories</td>
                                    <td>carbs</td>
                                    <td>fat</td>
                                    <td>fiber</td>
                                    <td>weight</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                    <td>{this.state.currentFood.name}</td>
                                    <td>{this.state.currentFood.protein.toFixed(2)}</td>
                                    <td>{this.state.currentFood.calories.toFixed(2)}</td>
                                    <td>{this.state.currentFood.carbs.toFixed(2)}</td>
                                    <td>{this.state.currentFood.fats.toFixed(2)}</td>
                                    <td>{this.state.currentFood.fiber.toFixed(2)}</td>
                                    <td>
                                        <input type="number"
                                            defaultValue={this.state.currentFood.weight}
                                            onChange={(e) => {
                                                this.calculateChanges(Number(e.target.value));
                                            }} />

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
