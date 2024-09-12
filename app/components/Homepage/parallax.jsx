import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
import useWidth from '@/app/hooks/useWidth'


const parallax = () => {


    const { width } = useWidth()

    if (width <= 1024) {
        return (
            <img src="/header1.svg" alt="" />
        )
    }

    return (
        <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1} className="w-full h-full lg:pt-20">
            <div className="w-full h-full">
                <MouseParallaxChild factorX={0.6} factorY={0.8} className="absolute w-full h-full flex items-center justify-center">
                    <img src="/SVG/Varlık4.svg" alt="" className="w-[110px] ml-[445px] mb-[0px]" />
                </MouseParallaxChild>
                <MouseParallaxChild factorX={0.5} factorY={0.7} className="absolute w-full h-full flex items-center justify-center">
                    <img src="/SVG/Varlık3.svg" alt="" className="w-[380px] ml-[120px] mb-[130px]" />
                </MouseParallaxChild>
                <MouseParallaxChild factorX={0.4} factorY={0.6} className="absolute w-full h-full flex items-center justify-center">
                    <img src="/SVG/Varlık2.svg" alt="" className="w-[250px] mr-[300px] mb-[130px]" />
                </MouseParallaxChild>
                <MouseParallaxChild factorX={0.3} factorY={0.5} className="absolute w-full h-full flex items-center justify-center">
                    <img src="/SVG/Varlık1.svg" alt="" className="w-[180px] mr-[535px] mt-[50px]" />
                </MouseParallaxChild>
            </div>
        </MouseParallaxContainer>
    );
}

export default parallax