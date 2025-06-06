import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { images_data } from "./Img/images_info";
import styles from "./Carousel.module.css";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {images_data?.map((single_img_item, i) => {
          return <img key={i} src={single_img_item} alt="" />;
        })}
      </Carousel>
      <div className={styles.fade_bottom_effect}></div>
    </div>
  );
}

export default CarouselEffect;
