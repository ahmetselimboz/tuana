import { useSpring, animated } from '@react-spring/web';

const Dropdown = ({ isOpen, children, classw }) => {
    const animationProps = useSpring({
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
        transform: isOpen ? `translateY(-20px)` : `translateY(0px)`,
        config: { tension: 220, friction: 20 },
    });

    return (
        <animated.div style={animationProps} className={classw} >
            {children}
        </animated.div>
    );
};

export default Dropdown;