import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", '/dashboard/preview(.*)'],
    ignoredRoutes: ["/api/uploadthing", "/api/saveproject", "/api/getpreview", "/api/payment"]
});

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};