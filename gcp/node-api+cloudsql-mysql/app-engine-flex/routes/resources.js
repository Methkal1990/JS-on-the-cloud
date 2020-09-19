
const express = require("express");
const router = express.Router();
const {
    getResources,
    addResource,
    getSingleResource,
    updateResource,
    deleteResource
} = require("../db/Resource")




router.get("/", async (req, res) => {
    const resources = await getResources();
    res.send({
        success: true,
        data: resources
    });
});

router.get("/:id", async (req, res) => {
    const resource = await getSingleResource(req.params.id);
    if (!resource) return res.status(404).send("Resource was not found");
    res.send({
        success: true,
        data: resource
    });
});

// add a resource --> the json data in the body should have at least a name value
router.post("/", async (req, res) => {
    await addResource(req.body);
    res.status(201).send({
        success: true
    });
});

router.put("/:id", async (req, res) => {
    await updateResource(req.params.id, req.body);
    res.status(204).send({
        success: true
    });
})

router.delete("/:id", async (req, res) => {
    await deleteResource(req.params.id);
    res.status(204).send({
        success: true
    });
})

module.exports = router;