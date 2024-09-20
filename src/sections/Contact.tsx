import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 pt-12 lg:py-24 lg:pt-20 relative">
      {/* Ensure the section itself has a high z-index */}
      <div className="container relative z-20">
        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center md:text-left relative z-20 overflow-hidden">
          {/* Adjust the z-index of the background image */}
          <div
            className="absolute inset-0 opacity-5 -z-10"
            style={{
              backgroundImage: `url(${grainImage.src})`,
            }}
          ></div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">
                Let&apos;s create something amazing together
              </h2>
              <p className="text-sm md:text-base mt-2">
                Ready to bring your next project to life? Let&apos;s connect and
                discuss how I can help you achieve your goals.
              </p>
            </div>
            <div>
              {/* Ensure the anchor tag is not affected by any other styles */}
              <a
                href="https://wa.me/201111650444"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-white bg-gray-900 items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900 hover:-rotate-3 transition duration-300 relative z-30"
              >
                <span className="font-semibold">Contact Me</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
