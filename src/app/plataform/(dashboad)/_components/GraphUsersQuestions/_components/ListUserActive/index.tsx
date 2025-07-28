import Image from "next/image";

const users = [
  { name: "Edwin Reule", photo: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Ana Lima", photo: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Carlos Souza", photo: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Beatriz Rocha", photo: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "João Pedro", photo: "https://randomuser.me/api/portraits/men/5.jpg" },
];

const ListUserActive = () => {
  return (
    <ul className="flex flex-wrap">
      {users.map((user, index) => (
        <li key={index} className="grid w-10 -mr-2.5 z-2">
          <div className="w-10 h-10 relative">
            <Image
              src={user.photo}
              layout="fill"
              alt={user.name}
              className="rounded-full object-cover border-2 border-white"
            />
          </div>
        </li>
      ))}
      <li className="grid w-10 -mr-2.5 z-1">
        <div className="w-10 h-10 relative bg-slate-800 text-white rounded-full items-center justify-center text-center font-semibold grid text-sm border-white">
          +23
        </div>
      </li>
    </ul>
  );
};

export default ListUserActive;
