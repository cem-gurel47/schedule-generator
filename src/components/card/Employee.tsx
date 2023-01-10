import { Employee } from "@models/types";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  employee: Employee;
};

function Employee({ employee }: Props) {
  const { name, email, position, department, id } = employee;
  return (
    <div className="card-bordered card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title ">{name}</h2>
        <h3 className="card-subtitle">{position}</h3>
        {department && <p className="card-text">{department}</p>}
        <p>{email}</p>

        <div className="card-actions">
          <div className="flex w-full justify-end">
            <Link href={`/dashboard/manager/employees/${id}`}>
              <button className="btn-secondary btn gap-2">
                View Profile
                <UserCircleIcon className="h-6 w-6" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;
