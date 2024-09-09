import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Error404() {

  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      window.location.replace('/');
    }, 10000);

    return () => {
      clearInterval(timerInterval);
      clearTimeout(redirectTimeout);
    };
  }, []);


  return (
    <>
      <div className="relative overflow-hidden">
        <div className="relative grid h-screen place-content-center space-y-6 bg-neutral-950 p-8">
          <p className="text-center text-9xl font-dark text-light">
            404
          </p>
          <p className="text-center text-3xl text-neutral-400">
            This Page Cannot Be Found!
          </p>
          <div className="text-2xl mb-6 text-center text-neutral-400">
            Redirecting to <Link className="font-semibold text-light text-3xl rounded-full hover:bg-light/10 p-2" to="/">Home</Link> in {timer} seconds.
          </div>
        </div>
        <motion.div
          initial={{ transform: "translateX(-10%) translateY(-10%)" }}
          animate={{
            transform: "translateX(10%) translateY(10%)",
          }}
          transition={{
            repeat: Infinity,
            duration: 0.2,
            ease: "linear",
            repeatType: "mirror",
          }}
          style={{
            backgroundImage: 'url("noise.png")',
          }}
          className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
        />
      </div>
    </>
  )
}

export default Error404
