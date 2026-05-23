"use client";

import { FadeInView } from "@/components/animations";

const About = () => {
  return (
    <section className="relative px-6 py-24 lg:py-32" id="About">
      <div className="mx-auto max-w-5xl">
        <FadeInView>
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-sage-500 mb-3">
              Our philosophy
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-sand-900 tracking-tight">
              A space that understands
            </h2>
          </div>
        </FadeInView>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <FadeInView delay={0.1}>
            <div className="card-calm p-8 lg:p-10">
              <div className="text-3xl mb-4">🌊</div>
              <h3 className="text-xl font-medium text-sand-800 mb-4 leading-snug">
                Welcome to Calm Cove — a gentle place for your mental wellness
                journey
              </h3>
              <p className="text-sand-600 leading-relaxed mb-4">
                We believe healing isn&apos;t linear, and that&apos;s perfectly okay.
                CalmCove is designed to meet you wherever you are — offering tools,
                stories, and a quiet community that supports your wellbeing without
                pressure.
              </p>
              <p className="text-sand-500 text-sm leading-relaxed italic">
                &quot;Some days, just showing up is enough.&quot;
              </p>
            </div>
          </FadeInView>

          <FadeInView delay={0.2}>
            <div className="card-calm p-8 lg:p-10">
              <div className="text-3xl mb-4">🕯️</div>
              <h3 className="text-xl font-medium text-sand-800 mb-4 leading-snug">
                A mindful corner of the internet
              </h3>
              <p className="text-sand-600 leading-relaxed mb-6">
                Think of this as your digital retreat — a place where mindfulness
                meets warmth, where self-reflection is celebrated, and where
                every story matters. No noise, no comparison, no rush.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Journaling", "Reflection", "Stories", "Resources"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-sage-50 border border-sage-200/60 px-4 py-1.5 text-xs font-medium text-sage-700"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};

export default About;
