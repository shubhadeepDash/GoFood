import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();

        setFoodItem(response[0])
        setFoodCat(response[1])
        // console.log(response[0], response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (

        <div>
            <div> <Navbar /> </div>
            <div>
                <div>
                    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel" style={{ objectFit: "contain !important" }}>
                        <div className="carousel-inner" id='carousel'>
                            <div className="carousel-caption" style={{ zIndex: "10" }}>
                                <div className="d-flex justify-content-center">
                                    <input className="form-control  mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                                    {/*<button className="btn btn-outline-success my-2 my-sm-0 text-white" type="submit">Search</button>*/}
                                </div>
                            </div>
                            <div className="carousel-item active">
                                <img className="d-block w-100" src="https://source.unsplash.com/random/900x700/?burger" style={{ filter: "brightness(30%)" }} alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://source.unsplash.com/random/900x700/?pastry" style={{ filter: "brightness(30%)" }} alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://source.unsplash.com/random/900x700/?barbeque" style={{ filter: "brightness(30%)" }} alt="Third slide" />
                            </div>
                        </div>
                        <Link className="carousel-control-prev" to="#carouselExampleFade" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </Link>
                        <Link className="carousel-control-next" to="#carouselExampleFade" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {foodItem !== []
                                    ?
                                    foodItem.filter((item) => (item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card foodItem={filterItems}
                                                        options={filterItems.options[0]}
                                                    ></Card>
                                                </div>
                                            )
                                        })

                                    : <div>No such data found</div>}
                            </div>

                            )
                        })
                        : ""
                }
            </div>
            <div> <Footer /> </div>
        </div>
    )
}
