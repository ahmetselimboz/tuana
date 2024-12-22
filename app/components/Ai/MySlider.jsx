import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useWidth from "@/app/hooks/useWidth";
import { useState } from "react";

const MySlider = ({questions, setAskQuestion}) => {

    const { width } = useWidth()



    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: width >= 1024 ? 2 : 1, // Aynı anda kaç kart göstereceğinizi belirleyin
        slidesToScroll: 1, // Kaç kart kaydırılacağını belirleyin
        arrows: true // Ok tuşlarını göster
    };

    return (
        <div className='w-full pb-2'>

            <Slider {...settings}>
                {questions.map((text, index) => (
                    <div key={index} onClick={()=>{setAskQuestion(text)}} className='w-fit  h-[28px] mr-2 rounded-full cursor-pointer transition-all px-2 lg:text-sm text-xs text-primary hover:text-main  hover:bg-primary  hover:shadow-xl bg-main border border-primary flex items-center justify-center '>
                        <div className="h-fit flex items-center justify-center py-1">
                            {text}
                        </div>
                    </div>
                ))}
            </Slider>


        </div>
    );
};

export default MySlider;
