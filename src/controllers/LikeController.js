const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        console.log(req.io, req.connectedUsers);

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({error: 'Dev not exists!'});
        }

        // Impede que o usuário dê like 2x no mesmo dev
        if (loggedDev.likes.includes(targetDev._id)) {
            return res.json(loggedDev);
        }

        loggedDev.likes.push(targetDev._id);
        await loggedDev.save();

        // Caso o alvo já tenha dado like no usuário atual, ocorre um match!
        if (targetDev.likes.includes(loggedDev._id)) {
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetDev);
            }

            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }

        return res.json(loggedDev);
    }
};