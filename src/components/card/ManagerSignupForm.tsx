const ManagerSignupForm = () => {
  return (
    <div className="grid-cols-1">
      <h1 className="text-2xl font-bold">Account Information</h1>
      <div className="flex flex-col items-center">
        <div className="flex w-full flex-col items-baseline">
          <label htmlFor="email" className="text-sm text-gray-500">
            Email*
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            className="input-bordered input-primary input mt-1 w-full"
          />
        </div>
        <div className="mt-2 flex w-full flex-col items-baseline">
          <label htmlFor="password" className="text-sm text-gray-500">
            Password*
          </label>
          <input
            required
            type="password"
            name="password"
            id="password"
            className="input-bordered input-primary input mt-1 w-full"
          />
        </div>
        <div className="mt-2 flex w-full flex-col items-baseline">
          <label htmlFor="confirmPassword" className="text-sm text-gray-500">
            Confirm Password*
          </label>
          <input
            required
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="input-bordered input-primary input mt-1 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerSignupForm;
