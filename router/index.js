const router = require('express').Router();
const magicUrlModel = require('../model/shortener');


// get request for home page

router.get('/', (req, res) => {
    res.render('index');
});
/***/


// get request to redirect user to destination url
// START
router.get('/:shortID', async (req, res) => {
    let id = req.params.shortID;
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    try{
        let destination = await magicUrlModel.findOne({
            short_id: id,
        });

        if(!destination){
            return res.status(404).end();
        }

        // else
        // found
        // redirect user to destination.destinationUrl
        //
        res.redirect(destination.destination);
    }catch(err){
        console.log(`[MAGIC API FETCH ERROR]: ${err.message}`);
        res.status(500).json({'Error':'Server Internal Problem'});
    }
});

module.exports = router;
