const httpGot = require('got')

const routes = {

    getRates: async (req, res) => {
        const base = req.query.base;
        const currency = req.query.currency;

        if (!base) return res.status(400).json({status: 'error', message: 'Base is a required parameter'})
        if (!currency) return res.status(400).json({status: 'error', message: 'Currency is a required'})


        try {
            const response = await httpGot.get(`https://api.exchangeratesapi.io/latest?base=${base.trim().toUpperCase()}&symbols=${currency.trim().toUpperCase()}`);

            if (!response){
                return res.status(500).json({status: 'error', message: 'Something went wrong'})
            }

            if (response.statusCode === 400){
                const {error} = response.body
                return res.status(400).json({status: 'error', message: error})
            }

            const excBase = JSON.parse(response.body).base
            const {date, rates} = JSON.parse(response.body);
            return res.json({
                results: {
                    base: excBase,
                    date,
                    rates
                }
            });

        }catch (e){
            return res.status(400).json({status: "error", message: e.message})
        }

    }

}

module.exports = routes