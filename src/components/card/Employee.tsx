type Props = {
  name: string;
  email: string;
  phone: string;
  position: string;
  status: string;
};

function Employee(props: Props) {
  const { name, email, phone, position, status } = props;
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-700">Name</div>
            <div className="text-sm text-gray-700">{name}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-700">Email</div>
            <div className="text-sm text-gray-700">{email}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-700">Phone</div>
            <div className="text-sm text-gray-700">{phone}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-700">Position</div>
            <div className="text-sm text-gray-700">{position}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-700">Status</div>
            <div className="text-sm text-gray-700">{status}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;
