-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Workflow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "definition" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Workflow" ("created_at", "definition", "description", "id", "name", "status", "updated_at", "userId") SELECT "created_at", "definition", "description", "id", "name", "status", "updated_at", "userId" FROM "Workflow";
DROP TABLE "Workflow";
ALTER TABLE "new_Workflow" RENAME TO "Workflow";
CREATE UNIQUE INDEX "Workflow_userId_name_key" ON "Workflow"("userId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
