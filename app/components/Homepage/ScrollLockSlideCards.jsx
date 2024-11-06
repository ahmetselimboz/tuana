import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useWidth from '@/app/hooks/useWidth';
import FirstCard from './Cards/FirstCard';
import SecondCard from './Cards/SecondCard';
import ThirdCard from './Cards/ThirdCard';
import FourthCard from './Cards/FourthCard';
import FifthCard from './Cards/FifthCard';
import SixthCard from './Cards/SixthCard';

const ScrollLockSlideCards = () => {
    const scrollSectionRef = useRef(null);
    const [scrollIndex, setScrollIndex] = useState(0);
    const [isScrollingLocked, setIsScrollingLocked] = useState(false);
    const { width } = useWidth();

    const cards = [
        { card: <FirstCard /> },
        { card: <SecondCard /> },
        { card: <ThirdCard /> },
        { card: <FourthCard /> },
        { card: <FifthCard /> },
        { card: <SixthCard /> },
    ];
    const maxIndex = cards.length - 1;

    // Scroll handler with throttle effect for locking
    const handleScroll = (event) => {
        if (!isScrollingLocked) {
            setIsScrollingLocked(true);
            setScrollIndex((prevIndex) => {
                const newIndex = event.deltaY > 0
                    ? Math.min(prevIndex + 1, maxIndex)
                    : Math.max(prevIndex - 1, 0);

                // Unlock scrolling when at start or end
                if (newIndex === 0 || newIndex === maxIndex) {
                    setTimeout(() => setIsScrollingLocked(false), 500);
                } else {
                    setTimeout(() => setIsScrollingLocked(false), 800);
                }
                return newIndex;
            });
        }
        event.preventDefault();
    };

    // Intersection Observer to enable scroll locking only within the section
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    window.addEventListener('wheel', handleScroll, { passive: false });
                } else {
                    window.removeEventListener('wheel', handleScroll);
                }
            },
            { threshold: 0.7 }
        );

        if (scrollSectionRef.current) {
            observer.observe(scrollSectionRef.current);
        }

        return () => {
            window.removeEventListener('wheel', handleScroll);
            if (scrollSectionRef.current) {
                observer.unobserve(scrollSectionRef.current);
            }
        };
    }, [isScrollingLocked, maxIndex]);

    return (
        <div>
            <div style={{ height: '10vh' }}>

            </div>

            {/* Scroll-locked Section */}
            <section
                ref={scrollSectionRef}
                style={{
                    height: '100vh',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <motion.div
                    style={{
                        display: 'flex',
                        width: `${width * cards.length}px`, // Set the container width
                    }}
                    animate={{
                        x: -scrollIndex * width,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 25,
                    }}
                >
                    {cards.map((item, index) => (
                        <div
                            key={index}
                            className='lg:py-24 lg:px-48 px-8'
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
                </motion.div>
            </section>
            <div style={{ height: '8vh' }}>

            </div>

        </div>
    );
};

export default ScrollLockSlideCards;
