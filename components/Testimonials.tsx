import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <section className="bg-white dark:bg-gray-900 p-16" id="Testimonials">
      <div className="pb-20 max-w-screen-xl">
        <h1 className="md:text-4xl xl:text-4xl text-2xl font-bold text-center my-10">
          INSPIRING STORIES
        </h1>
        <div className="lg:grid lg:grid-cols-3 gap-4 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <TestimonialCard
            heading={"Living with Anxiety"}
            body={
              "Anxiety controlled my life, making even simple tasks difficult. Cognitive-behavioral therapy taught me how to manage my anxiety. I can now enjoy social events without overwhelming fear."
            }
          />
          <TestimonialCard
            heading={"Dealing with OCD"}
            body={
              "OCD rituals consumed my days. Exposure and response prevention therapy helped me reduce my compulsions. Life is more manageable now, and I feel freer."
            }
          />
          <TestimonialCard
            heading={"Adolescent Struggles with Mental Health"}
            body={
              "As a teen, depression and anxiety overwhelmed me. Therapy and support from loved ones helped me develop coping skills. I'm in a better place and looking forward to my future."
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
