import { Router, type IRouter } from "express";
import authRouter from "./auth.ts";
import workspacesRouter from "./workspaces.ts";
import projectsRouter from "./projects.ts";
import columnsRouter from "./columns.ts";
import cardsRouter from "./cards.ts";
import notificationsRouter from "./notifications.ts";
import dashboardRouter from "./dashboard.ts";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/v1/auth", authRouter);
router.use("/v1/workspaces", workspacesRouter);
router.use("/v1/workspaces/:workspaceId/projects", projectsRouter);
router.use("/v1/workspaces/:workspaceId/projects/:projectId/columns", columnsRouter);
router.use("/v1/workspaces/:workspaceId/projects/:projectId/cards", cardsRouter);
router.use("/v1/notifications", notificationsRouter);
router.use("/v1/dashboard", dashboardRouter);

export default router;
