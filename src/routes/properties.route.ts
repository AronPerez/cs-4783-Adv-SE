import express from 'express'
const router = express.Router();
const propertyController = require('../controllers/property.controller');
const awaitHandlerFactory = require('../middlewear/awaitHandlerFactory.middlewear');
const auth = require('../middlewear/security-handler.middlewear')

router.get('/', awaitHandlerFactory({middleware: propertyController.getProperty}));
router.post('/', auth(),awaitHandlerFactory({middleware: propertyController.createProperty}));

router.get('/:id', awaitHandlerFactory({middleware: propertyController.getPropertyById}));
router.put('/:id', auth(),awaitHandlerFactory({middleware: propertyController.updatePropertyById}));
router.delete('/:id', auth(),awaitHandlerFactory({middleware: propertyController.deleteByPropertyId}));

module.exports = router;