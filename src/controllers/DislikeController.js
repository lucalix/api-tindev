const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({error: 'Dev not exists!'});
        }

        // Impede que o usuário dê dislike 2x no mesmo dev
        if (loggedDev.dislikes.includes(targetDev._id)) {
            return res.json(loggedDev);
        }

        loggedDev.dislikes.push(targetDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
    }
};