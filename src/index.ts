import { Router } from "express";
import { generateAddressMiddleware } from "./middlewares/generateAddressMiddleware";
import { generateMultiSigAddressMiddleware } from "./middlewares/generateMultiSigAddressMiddleware";
import { getMnemonicMiddleware } from "./middlewares/getMnemonicMiddleware";

export const router = Router();
router.get("/mnemonic", getMnemonicMiddleware);
router.get("/address", generateAddressMiddleware);
router.get("/multi-sig-address", generateMultiSigAddressMiddleware);
