import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();
// ✅ Public Route: Fetch All Pets (No Auth Needed)
router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find(); // Get all pets from DB
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/pets/:id",  async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pet: " + error.message });
  }
});

export default router;
