module.exports = class RecordController {
    static async AddRecord(req, res) {


        try {
            // Add record to database
            res.json({ success: true, message: "Record added successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};