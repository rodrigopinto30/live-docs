
import CollaborativeRoom from '@/components/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.actions';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const Document = async ({params: {id}}: SearchParamProps) => {
  const clearkUser = await currentUser();
  if(!clearkUser) redirect('/sign-in');

  const room = await getDocument({
    roomId: id,
    userId: clearkUser.emailAddresses[0].emailAddress
  });
  if(!room) redirect('/');

  // TODO: Assess the permissins of the user to access the document.
  
  return (
    <main className='flex w-full flex-col items-center'>
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata} 
        users={[]} 
        currentUserType={'creator'}      
        />
    </main>
  )
}

export default Document