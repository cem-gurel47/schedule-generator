type Props = {
  plan: "Starter" | "Pro" | "Enterprise";
  description: string;
  price: string;
};

const planServices = {
  Starter: [
    "10 users included",
    "2 GB of storage",
    "Help center access",
    "Priority email support",
  ],
  Pro: [
    "20 users included",
    "10 GB of storage",
    "Help center access",
    "Priority email support",
  ],
  Enterprise: [
    "50 users included",
    "30 GB of storage",
    "Help center access",
    "Phone & email support",
  ],
};

function Pricing(props: Props) {
  const { plan, description, price } = props;
  const services = planServices[plan];

  return (
    <div
      className={`flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 ${
        plan === "Pro" ? "bg-blue-600 shadow-xl" : "bg-white"
      } rounded-lg border-blue-600 border-2 drop-shadow-md xl:p-8`}
    >
      <h3
        className={`mb-4 text-2xl font-semibold ${
          plan === "Pro" ? "text-white " : "text-gray-500"
        }`}
      >
        {plan}
      </h3>
      <p
        className={`font-light ${
          plan === "Pro" ? "text-white" : "text-gray-500"
        } sm:text-lg`}
      >
        {description}
      </p>
      <div className="flex justify-center items-baseline my-8">
        <span
          className={`mr-2 text-5xl font-extrabold ${
            plan === "Pro" ? "text-white" : "text-gray-500"
          }`}
        >
          {price}
        </span>
        {price !== "Free" && (
          <span
            className={`${plan === "Pro" ? "text-white" : "text-gray-500"}`}
          >
            /month
          </span>
        )}
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {services.map((service) => (
          <li className="flex items-center space-x-3" key={service}>
            <svg
              className="flex-shrink-0 w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span
              className={`${plan === "Pro" ? "text-white" : "text-gray-500"}`}
            >
              {service}
            </span>
          </li>
        ))}
      </ul>
      <a
        role="button"
        href="#"
        className={`${
          plan === "Pro" ? "text-white" : "text-blue-600"
        } transition duration-300 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
          plan === "Pro"
            ? "border border-white hover:bg-white hover:text-blue-600"
            : "border border-blue-600 hover:bg-blue-600 hover:text-white"
        }`}
      >
        {plan === "Starter" ? "Start for free" : `Buy ${plan}`}
      </a>
    </div>
  );
}

export default Pricing;
