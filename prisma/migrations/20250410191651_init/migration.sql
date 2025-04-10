-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('NOT_CHECKED', 'ACTIVE', 'BANNED', 'INVALID');

-- CreateEnum
CREATE TYPE "ProxyStatus" AS ENUM ('NOT_CHECKED', 'OK', 'DEAD', 'BLOCKED');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "sessionPath" TEXT NOT NULL,
    "status" "AccountStatus" NOT NULL DEFAULT 'NOT_CHECKED',
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proxy" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "status" "ProxyStatus" NOT NULL DEFAULT 'NOT_CHECKED',

    CONSTRAINT "Proxy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_identifier_key" ON "Account"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Proxy_address_key" ON "Proxy"("address");
