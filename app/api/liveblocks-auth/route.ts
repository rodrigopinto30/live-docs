import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
    const clerkUser = await currentUser();

    if (!clerkUser) redirect('/sign-in');

    const {id, firstName, lastName, emailAddresses, imageUrl} = clerkUser

    const user = {
        id,
        info: {
            id,
            name: `${firstName} ${lastName}`,
            email: emailAddresses[0].emailAddress,
            avatar: imageUrl,
            color: getUserColor(id)
        }
    };

      // Create an ID token for the user
  const { body, status } = await liveblocks.identifyUser({
      userId: user.info.email,
      groupIds:[]
    },
    {
      userInfo: {
        name: user.info
      },
    }
  );

  return new Response(body, { status });
}