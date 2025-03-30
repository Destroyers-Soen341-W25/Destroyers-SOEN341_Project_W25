import { useEffect, useState } from 'react';

const users = [
  { id: 'u1', name: 'i am a tired' },
  { id: 'u2', name: 'testuser' },
  { id: 'u3', name: 'i am a here' },
  { id: 'u4', name: 'chandler123' },
  { id: 'u5', name: 'spongebob' },
  { id: 'u6', name: 'superadmin' },
  { id: 'u7', name: 'Donald Duck' },
];

export default function FakeOnlineStatus() {
  const [onlineUserIds, setOnlineUserIds] = useState([]);

  useEffect(() => {
    const updateOnlineUsers = () => {
      const shuffled = users.sort(() => 0.5 - Math.random());
      const randomOnline = shuffled.slice(0, Math.floor(Math.random() * users.length));
      setOnlineUserIds(randomOnline.map((user) => user.id));
    };

    updateOnlineUsers();
    const interval = setInterval(updateOnlineUsers, 5000); // update every 5s

    return () => clearInterval(interval);
  }, []);

  const isOnline = (id) => onlineUserIds.includes(id);

  return (
    <div className="text-center py-8">
      <h1 className="text-2xl font-bold">Destroyers</h1>
      <button onClick={() => window.history.back()} className="absolute top-4 right-6 text-sm text-gray-600 hover:underline">Back</button>
      <div className="mt-10">
        <h2 className="font-bold text-lg">All Users</h2>
        <ul className="inline-block text-left mt-4 space-y-1">
          {users.map((user) => (
            <li key={user.id}>
              • {user.name}{' '}
              <span className={isOnline(user.id) ? 'text-green-600' : 'text-gray-500'}>
                {isOnline(user.id) ? 'Online' : 'Offline'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
