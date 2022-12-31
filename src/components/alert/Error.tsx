import {
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const ErrorAlert = ({
  error,
  description,
  setError,
}: {
  error: string;
  description: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const handleDismiss = () => {
    setError(undefined);
  };

  return (
    <div className="alert alert-error my-4 shadow-lg">
      <div>
        <ExclamationTriangleIcon className="h-5 w-5" />
        <div className="flex flex-col items-baseline">
          <h3 className="font-bold">{error}</h3>
          <div className="text-xs">{description}</div>
        </div>
      </div>
      <div className="flex-none">
        <button className="btn-square btn-xs btn" onClick={handleDismiss}>
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;
