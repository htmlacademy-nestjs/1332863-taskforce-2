-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "commentsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "responsesCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "tegs" SET DEFAULT ARRAY[]::TEXT[];
