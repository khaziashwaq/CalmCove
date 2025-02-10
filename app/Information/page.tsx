import { typesofmentalhealthproblem } from "@/data/typesofmentalhealthproblems";
import Link from "next/link";

const Information = () => {
  return (
    <section className="lg:px-44">
      <h1 className="md:text-4xl xl:text-4xl text-2xl my-10 font-bold text-center">
        Types of mental health problems
      </h1>
      <p className="px-20 pb-20 text-xl mx-auto font-medium text-center">
        Discover the diverse landscape of mental health. Learn about depression,
        anxiety, schizophrenia, and bipolar disorder, including symptoms,
        causes, and treatments. Empower yourself with knowledge to navigate
        mental health complexities.
      </p>
      <div className="px-20 mx-auto grid grid-rows-12 max-w-screen-xl lg:gap-4">
        {typesofmentalhealthproblem.information.map((a) => (
          <div>
            <h1 className="pb-10 md:text-2xl font-semibold underline">
              <Link
                href={`/Information/${a.link}`}
                className="hover:bg-blue-200 cursor-pointer"
              >
                {a.title}
              </Link>
            </h1>
            <p className="text-lg">{a.shortdesc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Information;
