import { useState, useEffect } from "react";

const FastCounter = ({ target = 0, duration = 1000 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;
        const counter = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const currentCount = Math.floor(target * easeOutQuad(progress));
            setCount(currentCount);
            if (currentFrame >= totalFrames) {
                clearInterval(counter);
                setCount(target);
            }
        }, frameRate);
        return () => clearInterval(counter);
    }, [target, duration]);
    const easeOutQuad = (t) => t * (2 - t);
    return (
        <div className="text-4xl font-bold">
            {count}
        </div>
    )
};

export default FastCounter;