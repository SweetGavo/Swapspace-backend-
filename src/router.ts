import { Router } from "express";
import { allAgent, createAgent, test } from "./handlers/agent";
import { joi_createAgent } from "./middleware";

const router = Router();

// Agent routes
/**
 * @swagger
 * Products:
 */

router.get("/", allAgent);
router.post("/", joi_createAgent, createAgent);
router.get("/test", test);

export default router;
