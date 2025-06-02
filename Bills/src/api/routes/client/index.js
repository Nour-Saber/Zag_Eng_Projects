import { Router } from "express";
import { AddClientRouter } from "./add_client.route.js";
import { DeleteClientRouter } from "./delete_client.route.js";
import { GetAllClientsRouter } from "./get_all_clients.route.js";
import { UpdateClientRouter } from "./update_client.route.js";
import { GetOneClientRouter } from "./get_one_client.route.js";

const router = Router();
router.use(AddClientRouter);
router.use(DeleteClientRouter);
router.use(GetAllClientsRouter);
router.use(UpdateClientRouter);
router.use(GetOneClientRouter);
export { router as ClientRouter };
