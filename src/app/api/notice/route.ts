import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req });
  if (!token || !token?.sub ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const notices = await prisma.notice.findMany({
      where: {
       studentId:token?.sub,
      },
      select:{
        details:true,
        createdAt:true,
      }
    });
    return NextResponse.json(notices);
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
};