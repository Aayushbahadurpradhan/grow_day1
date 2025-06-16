const AuditTrail = require("../audit/auditTrial.model");

const auditMiddleware = async (req, res, next) => {
    if (!["PUT", "DELETE"].includes(req.method)) return next();

    const user = req.user || {};
    const originalSend = res.send;

    res.send = async function (body) {
        try {
            const collection = req.baseUrl.split("/")[2];
            const id = req.params.id;

            const before = await req.Model.findById(id).lean();

            await AuditTrail.create({
                action: req.method === "PUT" ? "UPDATE" : "DELETE",
                collectionName: collection,
                documentId: id,
                userId: user._id,
                before : req.before || null,
                after: req.method === "PUT" ? JSON.parse(body)?.payroll ?? JSON.parse(body) : null,
                timestamp: new Date()});
        } catch (err) {
            console.error("Audit trail error:", err);
        }

        return originalSend.apply(this, arguments);
    };

    next();
};

module.exports = auditMiddleware;
