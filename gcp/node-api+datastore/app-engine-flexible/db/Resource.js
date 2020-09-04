const datastore = require("./datastore-client")

const getResources = async () => {
    const query = datastore.createQuery('Resource');
    const [resources] = await datastore.runQuery(query);
    return resources;
}

const addResource = async (resource) => {
    const resourceKey = datastore.key('Resource');
    const entity = {
        key: resourceKey,
        data: [
            {name: 'name', value: resource.name}
        ]
    };

    await datastore.save(entity);
}

const getSingleResource = async (id) => {
    const key = datastore.key(["Resource", parseInt(id)]);
    const [resource] = await datastore.get(key);
    return resource;
}

const updateResource = async (id, resource) => {
    const key = datastore.key(["Resource", parseInt(id)]);

    await datastore.update({
        key,
        data: {
            name: resource.name
        }
    })
}

const deleteResource = async (id) => {
    const key = datastore.key(["Resource", parseInt(id)]);
    await datastore.delete(key);
}

module.exports.getResources = getResources;
module.exports.addResource = addResource;
module.exports.getSingleResource = getSingleResource;
module.exports.updateResource = updateResource;
module.exports.deleteResource = deleteResource;