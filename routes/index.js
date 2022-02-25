import Router from "express";
import productsRoutes from "./products.js";
import usersRoutes from "./users.js";

const router = Router();

router.get("/", () => console.log("I am groot.... I mean root."));
router.use("/", productsRoutes);
router.use("/", usersRoutes);

export default router;