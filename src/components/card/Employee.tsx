import { Employee } from "@models/types";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

type Props = {
  employee: Employee;
};

function Employee({ employee }: Props) {
  const { name, email, phone, position, department, id } = employee;
  return (
    <div className="card bg-accent">
      <div className="card-body text-primary">
        <h2 className="card-title">{name}</h2>
        <h3 className="card-subtitle">{position}</h3>
        {department && <p className="card-text">{department}</p>}
        <p>{email}</p>
        <p>{phone}</p>

        <div className="card-actions">
          <div className="flex w-full justify-end">
            <Link href={`/dashboard/manager/employees/${id}`}>
              <button className="btn-primary btn gap-2">
                Edit
                <PencilSquareIcon className="h-6 w-6" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;
