import hero from "../public/hero.png";
import calm from "../public/calm.png";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900 mt-20">
      <div className="grid lg:grid-cols-12 max-w-screen-xl px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16">
        <div className="grid lg:grid-cols-3 place-self-center col-span-7">
          <div className="max-w-2xl md:text-5xl  xl:text-8xl text-4xl pb-4 tracking-widest font-bold lg:col-span-3">
            EMPOWERING
          </div>
          <div className="max-w-2xl md:text-5xl xl:text-8xl text-4xl pb-4 tracking-widest font-bold lg:col-span-2">
            MENTAL
          </div>
          <div className="">
            DISCOVER RESOURCES, EXPERT ADVICE, AND A SUPPORTIVE COMMUNITY FOR
            YOUR MENTAL WELL-BEING.
          </div>
          <div className="max-w-2xl  md:text-5xl  xl:text-8xl text-4xl pb-4 tracking-widest font-bold lg:col-span-3">
            WELLNESS
          </div>
        </div>
        <div className="col-span-5 lg:flex">
          <Image src={calm} alt="mockup" className="w-80 h-80 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
