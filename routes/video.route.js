import express from 'express';
import upload from '../middleware/multer.js';
import {
  uploadVideo,
  trimUploadedVideo,
  addSubtitlesToVideo,
  renderFinalVideo,
  downloadFinalVideo
} from '../controllers/video.controller.js';

const router = express.Router();

router.post('/upload', upload.single('video'), uploadVideo);
router.post('/:id/trim', trimUploadedVideo);
router.post('/:id/subtitles', addSubtitlesToVideo);
router.post('/:id/render', renderFinalVideo);
router.get('/:id/download', downloadFinalVideo);

export default router;
