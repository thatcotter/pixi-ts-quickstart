import { build } from "vite";

export default { 
    chokidarWatchOptions: {
     usePolling: true
   },
   base: "./dist/",
   build: {
	root: "./dist/"
   }
 }