import { Router } from "express";
import { getAddressMiddlewares } from "./middlewares/getAddressMiddlewares/getAddressMiddlewares";
import { getMnemonicMiddlewares } from "./middlewares/getMnemonicMiddewares/getMnemonicMiddlewares";
import { getMultiSigAddressMiddlewares } from "./middlewares/getMultiSigAddressMiddlewares/getMultiSigAddressMiddlewares";

export const router = Router();
router.get("/mnemonic", ...getMnemonicMiddlewares);
router.get("/address", ...getAddressMiddlewares);
router.get("/multi-sig-address", ...getMultiSigAddressMiddlewares);
