import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = [
  { prefix: "/pass", roles: ["Partner"] },
  {
    prefix: "/qr-code",
    roles: ["Partner"],
  },
  {
    prefix: "/programme",
    roles: ["OAK Staff", "Presenter", "Observer", "Coordination Team"],
  },
  {
    prefix: "/program",
    roles: ["OAK Staff", "Presenter", "Observer", "Coordination Team"],
  },
  {
    prefix: "/partners",
    roles: [
      "Partner",
      "OAK Staff",
      "Presenter",
      "Observer",
      "Coordination Team",
    ],
  },
  {
    prefix: "/directory",
    roles: [
      "Partner",
      "OAK Staff",
      "Presenter",
      "Observer",
      "Coordination Team",
    ],
  },
  { prefix: "/check-in", roles: ["Coordination Team"] },
  { prefix: "/attendance", roles: ["Coordination Team"] },
  { prefix: "/admin/check-in", roles: ["Coordination Team"] },
  { prefix: "/admin/attendance", roles: ["Coordination Team"] },
];

export async function proxy(request: NextRequest) {
  const refreshedResponse = await updateSession(request);
  const route = protectedRoutes.find(
    ({ prefix }) =>
      request.nextUrl.pathname === prefix ||
      request.nextUrl.pathname.startsWith(`${prefix}/`),
  );
  if (!route) return refreshedResponse;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: () => undefined,
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = user?.app_metadata?.role ?? user?.user_metadata?.role;
  if (!user || typeof role !== "string" || !route.roles.includes(role)) {
    return NextResponse.redirect(new URL("/register", request.url));
  }
  return refreshedResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
