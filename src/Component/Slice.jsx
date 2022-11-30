import React, { Component } from "react";
import "./Slice.css";

import Slider from "react-slick";
import phone from "/Users/changhunkim/Desktop/React/store/src/img/phone.png";
import ipad from "/Users/changhunkim/Desktop/React/store/src/img/ipad.png";
import mac from "/Users/changhunkim/Desktop/React/store/src/img/mac.png";
import watch from "/Users/changhunkim/Desktop/React/store/src/img/watch.png";
import air from "/Users/changhunkim/Desktop/React/store/src/img/air.png";

export default class Slice extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
    };
    return (
      <div>
        <h2 className="slice-h2">사과 제품</h2>
        <Slider {...settings}>
          <div className="slider">
            <img src={phone} className="img" alt="휴대폰" />
            <h4> Phone </h4>
          </div>
          <div className="slider">
            <img src={ipad} className="img" alt="테블릿" />
            <h4> Tablet Pc </h4>
          </div>
          <div className="slider">
            <img src={mac} className="img" alt="노트북" />
            <h4> Notd Book </h4>
          </div>
          <div className="slider">
            <img src={watch} className="img" width="30%" alt="시계" />
            <h4> Smart Watch </h4>
          </div>
          <div className="slider">
            <img src={air} className="img" alt="이어폰" />
            <h4> Ear Phone</h4>
          </div>
        </Slider>
      </div>
    );
  }
}
