import { getSession, signOut } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProfileIcon = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function getUser() {
      const session = await getSession();
      if(!session) router.push('/login')
      // console.log('client side session: ', session);
      setUser(session?.user);
    }
    getUser();
  }, []);

  // useEffect(()=>{
  //   if(!user) router.push('/login')
  // },[user])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block z-50" ref={dropdownRef}>
      <div className="cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Image
          src={user ? user.image : 'https://res.cloudinary.com/dfoa0w717/image/upload/v1716906364/blank-profile-picture-973460_960_720_dk4wv9.webp'}
          alt="User Icon"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      {isDropdownOpen && (
        <div className="absolute transform -translate-x-1/2 mt-2 w-[7rem] bg-white rounded-md shadow-lg z-50">
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-800 hover:text-white rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;



//<button className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800" onClick={() => signOut()}>Sign out</button>