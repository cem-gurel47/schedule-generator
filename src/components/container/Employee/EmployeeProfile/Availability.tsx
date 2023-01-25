import { trpc } from "@utils/trpc";
import { XCircleIcon } from "@heroicons/react/24/outline";
import type { Availability } from "@models/types";

type Props = {
  availability: Availability;
  setAvailabilities: React.Dispatch<React.SetStateAction<Availability[]>>;
};

const AvailabilityCard = (props: Props) => {
  const { availability, setAvailabilities } = props;
  const { mutate, isLoading } = trpc.employees.deleteAvailability.useMutation();
  return (
    <li className="relative bg-base-100 py-4 text-center" key={availability.id}>
      <button
        className="absolute right-2 top-2"
        disabled={isLoading}
        onClick={() => {
          mutate(
            {
              id: availability.id,
            },
            {
              onSuccess: () => {
                setAvailabilities((prev) =>
                  prev.filter((a) => a.id !== availability.id)
                );
              },
            }
          );
        }}
      >
        <XCircleIcon className="h-5 w-5 transition duration-150 ease-in-out hover:opacity-80" />
      </button>

      <p className="">
        {availability.start}- {availability.end}
      </p>
    </li>
  );
};

export default AvailabilityCard;
