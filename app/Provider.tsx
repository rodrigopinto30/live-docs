'use client';
import Loader from '@/components/Loader';
import { getClerkUsers } from '@/lib/actions/user.actions';
import {ClientSideSuspense, LiveblocksProvider} from '@liveblocks/react/suspense';
import { ReactNode } from 'react';
// 2:05:00
const Provider = ({children}:{children: ReactNode}) => {
  return (
    <LiveblocksProvider 
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({userIds});
        return users;
      }}  
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
  </LiveblocksProvider>
  )
}

export default Provider