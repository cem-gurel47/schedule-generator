import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const CompleteAccount = () => {
  return (
    <div className="absolute bottom-20 right-10">
      <Link href="/dashboard/employee/profile">
        <div className="alert alert-warning shadow-lg">
          <div>
            <ExclamationTriangleIcon className="h-6 w-6" />
            <div className="flex flex-col items-baseline">
              <h3 className="font-bold">Warning</h3>
              <span>Your account is missing important information!</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CompleteAccount;
