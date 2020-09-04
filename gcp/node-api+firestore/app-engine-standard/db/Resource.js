const firestore = require("./firestore-client")

const getResources = async () => {
    const querySnapshot = await firestore.collection("resources").get();
    const resources = querySnapshot.docs.map(doc => doc.data());
    return resources;
}

const addResource = async (resource) => {
    await firestore.collection("resources").add({
        name: resource.name
    });
}

const getSingleResource = async (id) => {
    let resource = await firestore.collection("resources").doc(id).get();
    resource = resource.data()
    return resource;
}

const updateResource = async (id, data) => {
    const resource =  firestore.collection("resources").doc(id);
    await resource.update({
        name: data.name
    });
}

const deleteResource = async (id) => {
    const resource =  firestore.collection("resources").doc(id);
    await resource.delete()
}

module.exports.getResources = getResources;
module.exports.addResource = addResource;
module.exports.getSingleResource = getSingleResource;
module.exports.updateResource = updateResource;
module.exports.deleteResource = deleteResource;