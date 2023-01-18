import { useContext } from "react";
import { BusinessContext } from "@contexts/index";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const Constraints = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Constraint</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Monday</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
            <td>
              <div className="grid grid-cols-2 gap-2">
                <button className=" btn bg-primary">
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button className=" btn bg-red-600">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>

          <AddConstraintRow />
        </tbody>
      </table>
    </div>
  );
};

const AddConstraintRow = () => {
  const { openingHours, closingHours } = useContext(BusinessContext);

  return (
    <tr>
      <td>
        <div className="form-control">
          <select className="select-bordered select max-w-xs">
            <option value={0}>Monday</option>
            <option value={1}>Tuesday</option>
            <option value={2}>Wednesday</option>
            <option value={3}>Thursday</option>
            <option value={4}>Friday</option>
            <option value={5}>Saturday</option>
            <option value={6}>Sunday</option>
          </select>
        </div>
      </td>
      <td className="grid grid-cols-2 gap-2">
        <input
          type="time"
          className="input-bordered input"
          value={openingHours[0] || ""}
          name="start"
        />
        <input
          type="time"
          className="input-bordered input"
          value={closingHours[0] || ""}
          name="end"
        />
      </td>
      <td>
        <select className="select-bordered select max-w-xs">
          <option value="min">Minimum</option>
          <option value="max">Maximum</option>
        </select>
        <input
          type="number"
          className="input-bordered input ml-2"
          defaultValue={0}
        />
      </td>
      <td>
        <select className="select-bordered select max-w-xs">
          <option value="Cashier">Cashier</option>
          <option value="VC">VC</option>
          <option value="manager">Manager</option>
        </select>
      </td>
      <td>
        <button className="btn w-full">
          <PlusIcon className="h-6 w-6" />
        </button>
      </td>
    </tr>
  );
};

export default Constraints;
