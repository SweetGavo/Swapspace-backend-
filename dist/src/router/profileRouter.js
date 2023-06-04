"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const profileController_1 = __importDefault(require("../controllers/profileController"));
const router = express_1.default.Router();
// Set up multer storage and file filter
const storage = multer_1.default.diskStorage({});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpg', 'image/gif', 'image/jpeg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        const error = new Error('Please provide a valid image file');
        error.code = 'LIMIT_UNEXPECTED_FILE';
        return cb(error, false);
    }
    cb(null, true);
};
// Create a multer upload instance
const upload = (0, multer_1.default)({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 } });
// Routes
router.post('/', upload.single('file'), profileController_1.default.createProfile);
router
    .route('/')
    .get(profileController_1.default.getAllProfile);
router
    .route('/:id')
    .get(profileController_1.default.getOneProfile);
router
    .route('/:profileId')
    .patch(profileController_1.default.updateProfile);
router
    .route('/:profileId')
    .delete(profileController_1.default.deleteProfile);
exports.default = router;
