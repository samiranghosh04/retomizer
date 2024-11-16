import { FaCube, FaBolt, FaLink, FaCheckCircle, FaWrench, FaGlobe } from "react-icons/fa";

const features = [
  {
    title: "Minimal and Lightweight",
    description:
      "Incredibly small with zero dependencies outside of React, making it perfect for projects that prioritize performance and simplicity.",
    icon: FaCube,
  },
  {
    title: "Async State Support",
    description:
      "Handle asynchronous states effortlessly without needing additional middleware like Redux Thunk or Saga.",
    icon: FaBolt,
  },
  {
    title: "Derived State Management",
    description:
      "Easily compute and subscribe to derived states, similar to Jotai, with automatic dependency handling.",
    icon: FaLink,
  },
  {
    title: "Simple and Intuitive API",
    description:
      "With just `get`, `set`, and `subscribe`, the API ensures minimal boilerplate and a quick learning curve compared to Redux.",
    icon: FaCheckCircle,
  },
  {
    title: "Optimized React Integration",
    description:
      "Leverages `useSyncExternalStore` for seamless performance and compatibility with React’s concurrent features.",
    icon: FaGlobe,
  },
  {
    title: "Flexible Architecture",
    description:
      "No rigid patterns; works perfectly for global, local, or derived states based on your project needs.",
    icon: FaWrench,
  },
];

const Features = () => {
  return (
    <section className="bg-black text-gray-100 py-12 px-6 relative">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="px-8 py-12 bg-transparent backdrop-blur-md rounded-lg mx-5 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <feature.icon className="h-6 w-6 ml-2 text-white" aria-hidden="true" />
              <h3 className="sm:text-xl text-base font-semibold ml-4">{feature.title}</h3>
            </div>
            <p className="text-gray-400 m-3 font-light">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
