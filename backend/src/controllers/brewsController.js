const prisma = require("../lib/prisma");

const VALID_METHODS = [
  "AEROPRESS",
  "DRIP_COFFEE",
  "V60",
  "FRENCH_PRESS",
  "ESPRESSO",
  "MOKA_POT",
  "COLD_BREW",
  "CHEMEX",
];

const REQUIRED_FIELDS = [
  "beans",
  "method",
  "coffeeGrams",
  "waterGrams",
  "rating",
  "tastingNotes",
];

// Checks the request body and returns a list of validation error messages.
// An empty array means the payload is valid.
function validateBrewPayload(body) {
  const errors = [];

  for (const field of REQUIRED_FIELDS) {
    const value = body[field];
    const isBlank =
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "");
    if (isBlank) {
      errors.push(`"${field}" is required.`);
    }
  }

  if (body.method !== undefined && !VALID_METHODS.includes(body.method)) {
    errors.push(`"method" must be one of: ${VALID_METHODS.join(", ")}.`);
  }

  return errors;
}

// GET /api/brews?method=AEROPRESS
async function listBrews(req, res, next) {
  try {
    const { method } = req.query;

    if (method && !VALID_METHODS.includes(method)) {
      return res.status(400).json({ error: "Invalid method filter." });
    }

    const brews = await prisma.brew.findMany({
      where: method ? { method } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(brews);
  } catch (err) {
    return next(err);
  }
}

// POST /api/brews
async function createBrew(req, res, next) {
  try {
    const errors = validateBrewPayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: "Validation failed.", details: errors });
    }

    const { beans, method, coffeeGrams, waterGrams, rating, tastingNotes } = req.body;

    const brew = await prisma.brew.create({
      data: {
        beans: beans.trim(),
        method,
        coffeeGrams: Number(coffeeGrams),
        waterGrams: Number(waterGrams),
        rating: Number(rating),
        tastingNotes: tastingNotes.trim(),
      },
    });

    return res.status(201).json(brew);
  } catch (err) {
    return next(err);
  }
}

// PUT /api/brews/:id
async function updateBrew(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid brew id." });
    }

    const existing = await prisma.brew.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Brew not found." });
    }

    const errors = validateBrewPayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: "Validation failed.", details: errors });
    }

    const { beans, method, coffeeGrams, waterGrams, rating, tastingNotes } = req.body;

    const brew = await prisma.brew.update({
      where: { id },
      data: {
        beans: beans.trim(),
        method,
        coffeeGrams: Number(coffeeGrams),
        waterGrams: Number(waterGrams),
        rating: Number(rating),
        tastingNotes: tastingNotes.trim(),
      },
    });

    return res.status(200).json(brew);
  } catch (err) {
    return next(err);
  }
}

// DELETE /api/brews/:id
async function deleteBrew(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid brew id." });
    }

    const existing = await prisma.brew.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Brew not found." });
    }

    await prisma.brew.delete({ where: { id } });

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = { listBrews, createBrew, updateBrew, deleteBrew };