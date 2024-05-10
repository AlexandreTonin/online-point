
async function CreateModel(model, data) {
    const newModel = await model.create(data);

    return newModel;
}

module.exports = CreateModel;