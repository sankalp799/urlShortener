const router = require('express').Router();
const shortid = require('shortid');
const ShortenerModel = require('../model/shortener');



router.get('/', (req, res) => {
    console.log(req.hostname, req.port, req.path);
    res.render('index');
});

router.post('/api/urlShort', async (req, res) => {
    //console.log('[API] message url: ', req.body.destination);
    // console.log(JSON.parse(req.body));    
    try{
        const newDoc = await ShortenerModel.create({
            destination: req.body.destination
        });

        res.json({
            short: req.hostname + '/' + newDoc.short
        });
    }catch(err){
        console.log(err.message);
        res.json({
            error: `couldn't generate short url please try again later`  
        });
    }
    
    /*
    res.render('index', {
        message: shortid.generate()
    });
    */
});

router.get('/:shortId', async (req, res) => {
    try{
        console.log('[ROUTE REQUEST] ROUTER:',  req.path.split('/')[1]);
        // console.log(req.origin + req.path);
        let destinationURL = await ShortenerModel.findOne({
            short: req.path.split('/')[1]
        });

        // console.log(destinationURL.destination);
        
        res.writeHead(301, {
            Location: destinationURL.destination
        });
        
        // res.writeHead(200);
        res.end();
    }catch(err){
        console.log(`[MONGO ERROR] fetch error: ${err.message}`);
        res.render('index', {
            message: `not found`
        });
    }
});


module.exports = router;
