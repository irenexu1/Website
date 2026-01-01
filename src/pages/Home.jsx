import React from 'react'
import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import { EffectComposer, Bloom } from "@react-three/postprocessing";


const Home = () => {
  return (
    <section className="w-full h-screen relative flex flex-col">
      <header className="absolute top-[20vh] md:top-55 left-0 right-0 z-10 font-rosarivo">
        <div className="mx-auto w-fit flex flex-col items-center">
          <p className="self-start text-sm sm:text-lg tracking-[0.25em] sm:tracking-[0.25em] mb-2 text-indigo-200
            ml-10 sm:-ml-0 md:-ml-4 lg:-ml-10 xl:-ml-18">
            Hi, I'm
          </p>

          <h1 className="text-[clamp(3rem,8vw,6rem)] leading-none text-center font-bold text-white">
            IRENE XU
          </h1>
            <p className="w-fit self-center text-sm sm:text-lg tracking-[0.25em] mb-2 text-indigo-200">
                an aspiring software engineer from UW
            </p>
        </div>
      </header>
    </section>
  );
}

export default Home;
