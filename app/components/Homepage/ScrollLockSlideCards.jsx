import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import useWidth from '@/app/hooks/useWidth';
import FirstCard from './Cards/FirstCard';
import SecondCard from './Cards/SecondCard';
import ThirdCard from './Cards/ThirdCard';
import FourthCard from './Cards/FourthCard';
import FifthCard from './Cards/FifthCard';
import SixthCard from './Cards/SixthCard';

gsap.registerPlugin(ScrollTrigger);

const ScrollLockSlideCards = () => {
    const scrollSectionRef = useRef(null);
    const cardContainerRef = useRef(null);
    const { width } = useWidth();

    const cards = [
        { card: <FirstCard /> },
        { card: <SecondCard /> },
        { card: <ThirdCard /> },
        { card: <FourthCard /> },
        { card: <FifthCard /> },
        { card: <SixthCard /> },
    ];

    useEffect(() => {
        // GSAP setup for horizontal scrolling
        const ctx = gsap.context(() => {
            const totalCards = cards.length;
            const totalScrollWidth = width * totalCards;

            // Animate horizontal scrolling
            gsap.to(cardContainerRef.current, {
                x: () => -(totalScrollWidth - width),
                ease: 'none',
                scrollTrigger: {
                    trigger: scrollSectionRef.current,
                    start: 'center center',
                    end: () => `+=${totalScrollWidth}`,
                    scrub: 1,
                    pin: true, // Locks the section during scrolling
                    anticipatePin: 1,
                    snap: {
                        snapTo: 1 / (cards.length - 1),
                        duration: 0.5,
                        ease: 'power1.inOut',
                    },
                },
            });
        }, scrollSectionRef);

        return () => {
            ctx.revert(); // Cleanup GSAP context
        };
    }, [cards.length, width]);

    return (
        <div>
            <div style={{ height: '10vh' }}></div>

            {/* Scroll-Locked Section */}
            <section
                ref={scrollSectionRef}
                style={{
                    height: '100vh',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <div
                    ref={cardContainerRef}
                    style={{
                        display: 'flex',
                        width: `${width * cards.length}px`, // Total width based on card count
                    }}
                >
                    {cards.map((item, index) => (
                        <div
                            key={index}
                            className="lg:py-24 lg:px-48 px-8"
                            style={{
                                minWidth: `${width}px`,
                                height: '100vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                color: '#fff',
                            }}
                        >
                            {item.card}
                        </div>
                    ))}
                </div>
            </section>

            <div style={{ height: '8vh' }}></div>
        </div>
    );
};

export default ScrollLockSlideCards;





