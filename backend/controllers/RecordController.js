const Record = require("../models/Record");
const CreateModel = require("../services/CreateModel");
const datetimeFormat = require("../utils/helpers/datetimeFormat");
const getToken = require("../utils/helpers/getToken");
const getUserIdByToken = require("../utils/helpers/getUserIdByToken");

module.exports = class RecordController {
    static async AddRecord(req, res) {
        const token = getToken(req);
        const userId = getUserIdByToken(token);

        let datetime = new Date()
        const formatedDatetime = datetimeFormat(datetime)

        try {
            const newRecord = await CreateModel(Record, { employeeId: userId, record: formatedDatetime, location: null, type: "S", notes: null });
            return res.status(201).json({
                success: true,
                message: "Record created successfully",
                data: newRecord,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    
};