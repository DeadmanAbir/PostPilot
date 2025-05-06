const HowItWorks = () => {
  return (
    <section className="w-full py-16 ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="md:text-7xl text-5xl   text-center py-3">
            How It Works
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Learn how our platform helps you create, schedule, and analyze your
            social media posts in just a few simple steps.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-gray-700 aspect-video bg-slate-100 dark:bg-gray-800">
            <div className="w-full h-full z-10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/70rEaeI8-5c?si=cYpAXzvJWuqFB0y9"
                title="How It Works Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              This step-by-step tutorial shows you how to get the most out of
              our platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
