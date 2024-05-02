'use client'
import React, { useEffect, useState } from 'react';
import { app, firestore } from './lib/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Users from './components/Users';
import ChatRoom from './components/ChatRoom';

function Page() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(firestore, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = { id: docSnap.id, ...docSnap.data() };
            setUser(userData);
            setLoading(false); // Set loading to false after user data is fetched
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          setLoading(false); // Set loading to false in case of error
        }
      } else {
        setUser(null);
        setLoading(false); // Set loading to false when user is logged out
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  if (loading) { // Show loading screen if loading is true
    return <div className='text-4xl'>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="flex-shrink-0 w-3/12">
        <Users userData={user} setSelectedChatroom={setSelectedChatroom} />
      </div>
      <div className="flex-grow w-9/12">
        {selectedChatroom ? (
          <ChatRoom user={user} selectedChatroom={selectedChatroom} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-2xl text-gray-400">Select a chatroom</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
