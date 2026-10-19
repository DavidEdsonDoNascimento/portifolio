import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Everything except the API, Next internals and files with an extension
  // (so `/api/health` and `/icon.svg` stay un-prefixed).
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
