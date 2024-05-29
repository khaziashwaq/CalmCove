const About = () => {
  return (
    <section className="bg-white dark:bg-gray-900 p-16" id="About">
      <h1 className="md:text-4xl xl:text-4xl text-2xl my-10 font-bold text-center ">
        ABOUT US
      </h1>
      <div className="px-4 mx-auto max-w-screen-xl lg:px-6 lg:grid lg:grid-cols-2 gap-6">
        <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
            Welcome to Calm Cove: Where Mental Wellness Gets a Quirky Makeover!
          </h2>
          <p className="mb-4 font-medium">
            At Calm Cove, we're all about embracing the quirks, quirps, and
            quibbles that make us beautifully unique. Dive into our treasure
            trove of articles, tools, and interactive doodads designed to help
            you navigate the ups, downs, and loop-de-loops of your mental health
            rollercoaster.
          </p>
          <a
            href="#"
            className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
          >
            Learn more
            <svg
              className="ml-1 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
        <div className="mb-4 inline-flex items-center px-3 py-2 text-md font-medium cols-span-2 md:text-2xl xl:text-xl text-slate-500">
          Picture this: a place where mindfulness meets mischief, where
          self-care comes with a side of silliness, and where laughter is the
          best medicine (right after proper therapy, of course).
          <br /> <br /> Dive into our treasure trove of articles, tools to
          sprinkle a little joy on your path to sanity. Join our merry band of
          misfits as we shatter stereotypes, share stories, and sprinkle glitter
          on the sometimes-dreary landscape of mental health.
          <br /> <br /> Here, we believe that embracing your quirks is not just
          encouraged—it's celebrated. So grab your unicorn onesie, strap on your
          superhero cape, and let's embark on this wild adventure called life
          together.
        </div>
      </div>
    </section>
  );
};

export default About;
