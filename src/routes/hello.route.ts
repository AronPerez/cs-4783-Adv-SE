import express from 'express' // Default express details
const router = express.Router(); // This is the react router that lets me manage multiple files

router.get('/', (req: any, res: any, next: any) => {
    res.send([{ // This is '/' local to this file, thus we get an array with a message
        message: 'hello yourself'
    }])
});

module.exports = router; // This is what allows the router to work successfully

