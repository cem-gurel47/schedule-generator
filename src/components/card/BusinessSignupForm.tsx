const BusinessSignupForm = () => {
  return (
    <div className="col-span-1">
      <h2 className="text-2xl font-bold">Business Information</h2>
      <div className="flex flex-col items-center">
        <div className="flex w-full flex-col items-baseline">
          <label htmlFor="businessName" className="text-sm text-gray-500">
            Business Name*
          </label>
          <input
            required
            type="text"
            name="businessName"
            id="businessName"
            className="input-bordered input mt-1 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessSignupForm;
