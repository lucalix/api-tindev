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

        // Caso o alvo já tenha dado like no usuário atual, ocorre um match!
        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('Deu Match!');
        }

        // Impede que o usuário dê like 2x no mesmo dev
        if (loggedDev.likes.includes(targetDev._id)) {
            return res.json(loggedDev);
        }

        loggedDev.likes.push(targetDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
    }
};