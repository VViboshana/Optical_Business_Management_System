import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-indigo-600">About Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're dedicated to providing top-quality service and value to our customers. Learn more about our journey, vision, and the team behind our success.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div>
            <img
              src="https://thumbs.dreamstime.com/b/optical-shop-woman-near-showcase-looking-eyeglasses-optical-shop-woman-near-showcase-looking-eyeglasses-choosing-eyewear-127660682.jpg"
              alt="Our Team"
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Text content */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h3>
            <p className="text-gray-600 mb-4">
              We are a team of passionate professionals committed to delivering the best digital solutions. Our company was founded with a mission to innovate and inspire through technology.
            </p>
            <p className="text-gray-600">
              With years of experience in the industry, we combine creativity, expertise, and dedication to bring your ideas to life. Our values are rooted in trust, integrity, and excellence.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Innovation', desc: 'We embrace new ideas and technologies to stay ahead.' },
              { title: 'Integrity', desc: 'Honesty and transparency are at the core of everything we do.' },
              { title: 'Excellence', desc: 'We strive to exceed expectations in every project.' },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-xl font-semibold text-indigo-700 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;