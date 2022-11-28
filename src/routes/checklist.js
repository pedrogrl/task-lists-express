const express = require("express");
const checklist = require("../models/checklist.js");

const router = express.Router();

const Checklist = require("../models/checklist.js");

// GET /checklists
router.get("/", async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).render("checklists/index", { checklists: checklists });
    } catch (error) {
        res.status(500).render("pages/error", {
            error: "Error while displaying tasklists",
        });
    }
});

// GET /new
router.get("/new", async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render("checklists/new", { checklist: checklist });
    } catch (error) {
        res.status(500).render("pages/error", {
            error: "Error while loading form",
        });
    }
});

// GET /edit
router.get("/:id/edit", async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render("checklists/edit", { checklist: checklist });
    } catch (error) {
        res.status(500).render("pages/error", {
            error: "Error while displying edit page",
        });
    }
});

// POST /checklists
router.post("/", async (req, res) => {
    let { name } = req.body.checklist;

    try {
        await Checklist.create({ name });
        res.redirect("/checklists");
    } catch (err) {
        res.status(422).render("checklists/new", {
            checklists: { ...checklist, error },
        });
    }
});

// GET /checklists/ID (parametro)
router.get("/:id", async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id).populate(
            "tasks"
        );
        res.status(200).render("checklists/show", { checklist: checklist });
    } catch (error) {
        res.status(500).render("pages/error", {
            error: "Error while displaying tasklist",
        });
    }
});

// PUT /checklists/ID
router.put("/:id", async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = await Checklist.findById(req.params.id);

    try {
        await checklist.update({ name });
        res.redirect("/checklists");
    } catch (error) {
        let errors = error.errors;
        res.status(422).render("checklists/edit", {
            checklist: { ...checklist, errors },
        });
    }
});

// DELETE /checklists/ID
router.delete("/:id", async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndDelete(req.params.id);
        res.redirect("/checklists");
    } catch (error) {
        res.status(500).render("pages/error", {
            error: "Error while trying to remove a tasklist",
        });
    }
});

module.exports = router;
