import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const MySlider = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2, // Aynı anda kaç kart göstereceğinizi belirleyin
        slidesToScroll: 1, // Kaç kart kaydırılacağını belirleyin
        arrows: true // Ok tuşlarını göster
    };

    return (
        <div className='w-full '>

            <Slider {...settings}>
                {[
                    "How do I get more people to use my platform?",
                    "What can I do to bring more users?",
                    "How do I make my platform more popular?",
                    "What can I change to keep users coming back?",
                    "How do I make people recommend?",
                    "What are easy ways to get more users?",
                ].map((text, index) => (
                    <div key={index} className='w-fit h-[28px] mr-2 rounded-full cursor-pointer transition-all px-2 text-sm  text-primary hover:text-main hover:bg-gradient-to-b hover:from-primary hover:to-primary shadow-lg hover:shadow-xl bg-gradient-to-b from-main to-zinc-200 border border-primary flex items-center justify-center '>
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
