import React, {useEffect, useState} from 'react';
import {
  IoIosArrowBack,
  IoIosArrowForward,
} from 'react-icons/io';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useAuth } from '../Contexts/AuthContext';

function ProductsCard(props) {
 
  const [dimensions, setDimensions] = useState({ width: window.innerWidth})

  useEffect(() => {
    function HandleResize() {
      setDimensions({
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', HandleResize)
    console.log(dimensions)

    return _ => {
      window.removeEventListener('resize', HandleResize)
    }
    
  })
  
 

  const { currentUser } = useAuth();
  const {
    index,
    id,
    amount,
    brand,
    descrip,
    headtitle,
    img0,
    img1,
    img2,
    model,
    price,
    guarantie,
    specs,
    addToFav,
    favBikes,
    addToCart,
    cartBikes,
   
   
  } = props;

  const NextArrow = ({ onClick }) => {
    return (
      <div
        className="arrow next my-auto  top-1/2 right-[5%]  z-[9999] absolute  cursor-pointer"
        onClick={onClick}
      >
        <IoIosArrowForward className="w-10 h-10 fill-primary " />
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className="arrow next my-auto top-1/2 left-[5%]  z-[9999] absolute cursor-pointer"
        onClick={onClick}
      >
        <IoIosArrowBack className="w-10 h-10 fill-primary" />
      </div>
    );
  };


  var settings = {
    infinite: true,
    lazyload: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    slidesToScroll: 1,
    arrows: true,
    centerPadding: 0,
    centerMargin: 0,
    minHeight: '100vh',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (index % 2 === 0 || dimensions.width < 1025 ) {
    return (
      <>
        <li
          key={id}
          className="min-h-screen w-full 
          flex flex-row mobile:flex-col mobile:min-h-screen"
        >
          <Slider
            {...settings}
            className="  h-screen w-6/12 mx-auto mobile:w-full"
          >
            <div className="w-full h-screen carousel-item mx-auto">
              <img
                id="car"
                src={img0}
                alt=" bike images s s "
                className="w-full object-cover h-screen mobile:object-cover mx-auto"
              />
            </div>
            <div className="w-full h-screen carousel-item mx-auto">
              <img
                src={img1}
                alt=" bike imagskcks"
                className="w-full object-cover h-screen mobile:object-cover mx-auto"
              />
            </div>
            <div className="w-full h-screen carousel-item mx-auto">
              <img
                src={img2}
                alt=" bikelara gel"
                className="w-full object-cover h-screen mobile:object-cover mx-auto"
              />
            </div>
          </Slider>

          <div className="w-6/12 flex flex-col justify-around mobile:w-screen mobile:h-screen mobile:justify-evenly">
            <div className=" flex font-semibold w-1/4 h-3/12 justify-center mx-auto text-center mobile:h-8/12 mobile:justify-evenly ">
              <div className=" text-slate-600 mx-auto mt-10 text-center text-3xl self-center font-semibold mobile:mt-0 mobile:text-lg">
                {brand}&nbsp;
              </div>
              <div className=" text-slate-600 mx-auto mt-10 text-center text-3xl self-center font-semibold  mobile:mt-0 mobile:text-lg">
                &nbsp;{model}
              </div>
            </div>

            <div className="h-2/12 text-slate-600 -mt-10 w-10/12 mx-auto text-center italic text-2xl font-semibold mobile:my-0 mobile:text-sm">
              "{headtitle}"
            </div>
            <div className="h-2/12 text-slate-600 w-10/12 mx-auto text-center mobile:text-xs">
              {descrip}
            </div>
            <div className="h-2/12 text-slate-600 w-10/12 mx-auto text-center mobile:text-xs">
              Specifications: {specs}
            </div>
            <div>
              { (amount <= 10) ? (<div className="h-2/12 text-slate-600 w-10/12 my-2 mx-auto mobile:text-sm">
                In stock : <span className=" animate-pulse"> Hurry up! Last {amount}</span>
              </div>) : (<div className="h-2/12 text-slate-600 w-10/12 my-2 mx-auto mobile:text-sm">
                In stock : Yes ({amount})
              </div>) }
              
              <div className="h-2/12 text-slate-600 w-10/12 my-2 mx-auto mobile:text-sm">
                Guarantee : {guarantie}
              </div>
              <div className="h-2/12 text-slate-600 w-10/12 mx-auto my-2  mobile:text-sm">
                Price: {price}€
              </div>
            
              <div 
               onClick={() =>addToFav(id, model, price, brand, img0)}
              className="h-3/12 text-slate-600 w-10/12 flex justify-center mx-auto  my-2  ">
                <button className="flex text-center justify-center rounded fill-slate-600 py-2 w-1/2  px-10 mobile:py-0 mobile:px-2 text-primary mobile:w-full bg-slate-700 align-middle">
                  
                Add to Favorites {favBikes.length === 0 ? (<></>) : (<span className="mx-1 "> ({favBikes.length}) </span>)}
                </button>
              </div>
              {currentUser ? (
                <div onClick={() => addToCart(id, model, price, brand, img0)} className="h-3/12 text-slate-600 w-10/12 flex justify-center mx-auto my-2">
                  <button className="flex text-center rounded fill-slate-600  w-1/2  px-10 py-2 mobile:py-0 mobile:px-2 text-primary justify-center mobile:w-full bg-slate-700 align-middle ">
                    
                  Add to Cart {cartBikes.length === 0 ? (<></>) : (<span className="mx-1 "> ({cartBikes.length}) </span>)}
                  </button>
                </div>
              ) : (
                <div className="h-3/12 text-slate-600 w-10/12 flex justify-center mx-auto my-2">
                  <Link
                    className="flex text-center rounded fill-slate-600  w-1/2  px-10 py-2 mobile:py-0 mobile:px-2 text-primary justify-center mobile:w-full bg-slate-700 align-middle "
                    to="/Login"
                  >
                    
                    Order Now
                  </Link>
                </div>
              )}
            </div>
            
          </div>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li
          key={id}
          className="min-h-screen w-full
          flex flex-row mobile:flex-col"
        >
          <div className="w-6/12 flex flex-col min-h-screen justify-around mobile:w-full mobile:min-h-screen">
            <div className=" flex font-semibold w-1/4 h-3/12 justify-center mx-auto  text-center">
              <div className=" text-slate-600 mx-auto mt-10 text-center text-3xl self-center font-semibold mobile:text-lg">
                {brand}&nbsp;
              </div>
              <div className=" text-slate-600 mx-auto mt-10 text-center text-3xl self-center font-semibold mobile:text-lg">
                &nbsp;{model}
              </div>
            </div>

            <div className="h-2/12 text-slate-600 -mt-10 w-10/12 mx-auto text-center italic text-2xl font-semibold mobile:my-0 mobile:text-sm">
              "{headtitle}"
            </div>
            <div className="h-2/12 text-slate-600 w-10/12 mx-auto text-center mobile:text-xs">
              {descrip}
            </div>
            <div className="h-2/12 text-slate-600 w-10/12 mx-auto text-center mobile:text-xs mobile:my-5">
              Specifications: {specs}
            </div>
            <div>
            { (amount <= 10) ? (<div className="h-2/12 text-slate-600 w-10/12 my-2 mx-auto mobile:text-sm">
                In stock : <span className=" animate-pulse"> Hurry up! Last {amount}</span>
              </div>) : (<div className="h-2/12 text-slate-600 w-10/12 my-2 mx-auto mobile:text-sm">
                In stock : Yes ({amount})
              </div>) }
              <div className="h-2/12 text-slate-600 w-10/12 my-2 mx-auto mobile:text-sm">
                Guarantee : {guarantie}
              </div>
              <div className="h-2/12 text-slate-600 w-10/12 mx-auto mobile:text-sm">
                Price: {price}€
              </div>
              <div className="h-3/12 text-slate-600 w-10/12 flex justify-center mx-auto  my-2  ">
                <button 
                onClick={() =>addToFav(id, model, price, brand, img0)}
                className="flex text-center justify-center rounded fill-slate-600 py-2 w-1/2  px-10 mobile:py-0 mobile:px-2 text-primary mobile:w-full bg-slate-700 align-middle">
                  
                  Add to Favorites {favBikes.length === 0 ? (<></>) : (<span className="mx-1 "> ({favBikes.length}) </span>)}
                </button>
              </div>

              {currentUser ? (
                <div onClick={() => addToCart(id, model, price, brand, img0)} className="h-3/12 text-slate-600 w-10/12 flex justify-center mx-auto my-2">
                  <button className="flex text-center rounded fill-slate-600  w-1/2  px-10 py-2 mobile:py-0 mobile:px-2 text-primary justify-center mobile:w-full bg-slate-700 align-middle ">
                    
                  Add to Cart {cartBikes.length === 0 ? (<></>) : (<span className="mx-1 "> ({cartBikes.length}) </span>)}
                  </button>
                </div>
              ) : (
                <div className="h-3/12 text-slate-600 w-10/12 flex justify-center mx-auto my-2">
                  <Link
                    className="flex text-center rounded fill-slate-600  w-1/2  px-10 py-2 mobile:py-0 mobile:px-2 text-primary justify-center mobile:w-full bg-slate-700 align-middle "
                    to="/Login"
                  >
                    
                    Order Now
                  </Link>
                </div>
              )}
            </div>

            
          </div>

          <Slider
            {...settings}
            className="  h-screen w-6/12 mx-auto mobile:w-full"
          >
            <div className="w-full h-screen carousel-item mx-auto">
              <img
                id="car"
                src={img0}
                alt=" bike images s s "
                className="w-full object-cover h-screen mobile:object-fill mx-auto"
              />
            </div>
            <div className="w-full h-screen carousel-item mx-auto">
              <img
                src={img1}
                alt=" bike imagskcks"
                className="w-full object-cover h-screen mobile:object-fill mx-auto"
              />
            </div>
            <div className="w-full h-screen carousel-item mx-auto">
              <img
                src={img2}
                alt=" bikelara gel"
                className="w-full object-cover h-screen mobile:object-fill mx-auto"
              />
            </div>
          </Slider>
        </li>
      </>
    );
  }
}

export default ProductsCard;
