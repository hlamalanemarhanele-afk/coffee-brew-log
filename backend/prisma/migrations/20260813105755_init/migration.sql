-- CreateEnum
CREATE TYPE "BrewMethod" AS ENUM ('AEROPRESS', 'DRIP_COFFEE', 'V60', 'FRENCH_PRESS', 'ESPRESSO', 'MOKA_POT', 'COLD_BREW', 'CHEMEX');

-- CreateTable
CREATE TABLE "brews" (
    "id" SERIAL NOT NULL,
    "beans" TEXT NOT NULL,
    "method" "BrewMethod" NOT NULL,
    "coffeeGrams" INTEGER NOT NULL,
    "waterGrams" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "tastingNotes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brews_pkey" PRIMARY KEY ("id")
);
