"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const rectorController_1 = __importDefault(require("../controllers/rectorController"));
//Set up multer storage and file filter
const storage = multer_1.default.diskStorage({});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpg',
        'image/gif',
        'image/jpeg',
        'image/png',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        const error = new Error('Please provide a valid image, PDF, or document file');
        error.code = 'LIMIT_UNEXPECTED_FILE';
        return cb(error, false);
    }
    cb(null, true);
};
// Create a multer upload instance
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
});
router.route('/').post(upload.array('broker_card_image', 2), rectorController_1.default.createAgentProfile);
router.route('/image-upload').post(upload.single('image'), rectorController_1.default.updateAgentProfileImage);
router
    .route('/')
    .get(rectorController_1.default.getAllRealtor);
router
    .route('/:id')
    .get(rectorController_1.default.getOneRealtor);
exports.default = router;
