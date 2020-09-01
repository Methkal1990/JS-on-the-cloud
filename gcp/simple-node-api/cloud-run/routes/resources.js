const express = require("express");
const router = express.Router();

const resources = [
    {name: "udemy", id: "1"},
    {name: "coursera", id: "2"},
    {name: "pluralsight", id: "3"},
    {name: "edx", id: "4"}
]

router.get("/", (req, res) => {
    res.send({success: true, data: resources});
});

router.get("/:id", (req, res) => {
    const resource = resources.find(item => item.id === req.params.id);
    if(!resource) return res.status(404).send("Resource was not found");
    res.send({success: true, data: resource});
});

router.post("/", (req, res) => {
    resources.push(req.body);
    res.status(201).send({success: true});
});

router.put("/:id", (req, res) => {
    const resource = resources.find(item => item.id === req.params.id);
    if(!resource) return res.status(404).send("Resource was not found");

    resource.name = req.body.name;
    res.status(204).send({success: true}); 
})

router.delete("/:id", (req, res) => {
    const resource = resources.find(item => item.id === req.params.id);
    if(!resource) return res.status(404).send("Resource was not found");

    const index = resources.indexOf(resource);

    resources.splice(index, 1);

    res.status(204).send({success: true})

})

module.exports = router;