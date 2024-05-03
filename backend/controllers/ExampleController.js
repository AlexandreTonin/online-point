module.exports = class ExampleController {
    static async method(req, res) {
        return res.status(200).json({ msg: "example" })
    }
};