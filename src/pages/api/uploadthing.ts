import { createRouteHandler } from "uploadthing/next-legacy";

import { ourFileRouter } from "@/components/server/uploadthing";
 
export default createRouteHandler({
    router: ourFileRouter,
});