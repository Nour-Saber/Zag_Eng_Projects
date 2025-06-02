import { Router } from "express";
import { AddProviderRouter } from "./add_provider.route.js";
import { UpdateProviderRouter } from "./update_provider.route.js";
import { GetOneProviderRouter } from "./get_provider.route.js";
import { DeleteProviderRouter } from "./delete_provider.route.js";
import { GetAllProvidersRouter } from "./get_all_providers.route.js";

const router = Router();
router.use(AddProviderRouter);
router.use(DeleteProviderRouter);
router.use(UpdateProviderRouter);
router.use(GetOneProviderRouter);
router.use(GetAllProvidersRouter);
export {router as ProviderRouter};