import calm from "../public/calm.png";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900 p-20">
      <div className="lg:grid lg:grid-cols-12 max-w-screen-xl lg:gap-8 gap-48">
        <div className="lg:grid lg:grid-cols-3 place-self-center lg:col-span-7 lg:pl-12">
          <div className="lg:max-w-2xl md:text-5xl  xl:text-8xl text-4xl lg:pb-4 tracking-widest font-bold lg:col-span-3">
            EMPOWERING
          </div>
          <div className="lg:max-w-2xl md:text-5xl xl:text-8xl text-4xl pb-4 tracking-widest font-bold lg:col-span-2">
            MENTAL
          </div>
          <div className="text-left">
            DISCOVER RESOURCES, EXPERT ADVICE, AND A SUPPORTIVE COMMUNITY FOR
            YOUR MENTAL WELL-BEING.
          </div>
          <div className="lg:max-w-2xl  md:text-5xl  xl:text-8xl text-4xl pb-4 tracking-widest font-bold lg:col-span-3">
            WELLNESS
          </div>
          <Link href="/Information">
            <button
              type="button"
              className=" justify-center col-span-1 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
            >
              Get Information
            </button>
          </Link>
        </div>
        <div className="col-span-5 lg:flex">
          <Image src={calm} alt="calm" className="lg:pl-10" unoptimized />
        </div>
      </div>
    </section>
  );
};

export default Hero;
