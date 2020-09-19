const {
    createPool,
    ensureSchema
} = require('./db-configs');

const Resource = async () => {
    const pool = await createPool();
    await ensureSchema(pool);
    return pool;
}

const getResources = async () => {
    const pool = await Resource();
    const resources = await pool.query(
        'SELECT * FROM resources'
    )
    return resources;
}

const addResource = async (resource) => {
    const pool = await Resource();
    await pool.query(
        'INSERT INTO resources (name) VALUES (?)', [resource.name]
    )
}

const getSingleResource = async (id) => {
    const pool = await Resource();
    const resource = await pool.query(
        'SELECT name FROM resources WHERE resource_id = ?', [id]
    )
    return resource;
}

const updateResource = async (id, resource) => {
    const pool = await Resource();
    await pool.query(
        'UPDATE resources SET name = ? WHERE resource_id = ?', [resource.name, id]
    )
}

const deleteResource = async (id) => {
    const pool = await Resource();
    await pool.query(
        'DELETE FROM resources WHERE resource_id = ?', [id]
    )
}

module.exports.getResources = getResources;
module.exports.addResource = addResource;
module.exports.getSingleResource = getSingleResource;
module.exports.updateResource = updateResource;
module.exports.deleteResource = deleteResource;