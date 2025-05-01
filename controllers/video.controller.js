import prisma from '../config/prisma.config.js';
import { trimVideo, addSubtitles } from '../utils/ffmpegHelper.js';
import path from 'path';
import fs from 'fs';

export const uploadVideo = async (req, res) => {
  try {
    const { filename, path: filePath, size } = req.file;

    if(!filename || !filePath) {
        return res.status(400).json({ error: 'File upload failed' });
    }
    const duration = 0; 

    const video = await prisma.video.create({
      data: {
        name: filename,
        originalPath: filePath,
        duration,
        size,
      }
    });

    res.json({ success: true, video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
};

export const trimUploadedVideo = async (req, res) => {
  const { id } = req.params;
  const { startTime, endTime } = req.body;
  
  try {
    const video = await prisma.video.findUnique({ where: { id: parseInt(id) } });
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const outputPath = `uploads/trimmed-${video.name}`;
    await trimVideo(video.originalPath, outputPath, startTime, endTime);

    await prisma.video.update({
      where: { id: video.id },
      data: { finalPath: outputPath }
    });

    res.json({ success: true, message: 'Video trimmed successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Trimming failed' });
  }
};

export const addSubtitlesToVideo = async (req, res) => {
  const { id } = req.params;
  const { subtitleText, startTime, endTime } = req.body;

  try {
    const video = await prisma.video.findUnique({ where: { id: parseInt(id) } });
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const outputPath = `uploads/subtitled-${video.name}`;
    await addSubtitles(video.finalPath || video.originalPath, outputPath, subtitleText, startTime, endTime);

    await prisma.video.update({
      where: { id: video.id },
      data: { finalPath: outputPath }
    });

    res.json({ success: true, message: 'Subtitles added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Subtitles failed' });
  }
};

export const renderFinalVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await prisma.video.findUnique({ where: { id: parseInt(id) } });
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const finalVideoPath = `final_videos/final-${video.name}`;
    fs.copyFileSync(video.finalPath || video.originalPath, finalVideoPath);

    await prisma.video.update({
      where: { id: video.id },
      data: { status: 'rendered', finalPath: finalVideoPath }
    });

    res.json({ success: true, message: 'Video rendered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Render failed' });
  }
};

export const downloadFinalVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await prisma.video.findUnique({ where: { id: parseInt(id) } });
    if (!video || !video.finalPath) return res.status(404).json({ error: 'Final video not found' });

    res.download(path.resolve(video.finalPath));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Download failed' });
  }
};
