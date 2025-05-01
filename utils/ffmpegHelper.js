import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

const ffmpegPath = path.resolve(
  'C:/Users/HP/Downloads/ffmpeg-7.1.1-essentials_build/bin/ffmpeg.exe'
);

ffmpeg.setFfmpegPath(ffmpegPath);

export const trimVideo = (inputPath, outputPath, startTime, endTime) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .setStartTime(startTime)
      .setDuration(endTime - startTime)
      .output(outputPath)
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .run();
  });
};

export const addSubtitles = (inputPath, outputPath, subtitleText, startTime, endTime) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoFilters({
        filter: 'drawtext',
        options: {
          fontfile: '/usr/share/fonts/truetype/Roboto-serif.ttf', // Update if necessary
          text: subtitleText,
          fontsize: 36,
          fontcolor: 'black',
          x: '(w-text_w)/2',
          y: 'h-100',
          enable: `between(t,${startTime},${endTime})`
        }
      })
      .output(outputPath)
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .run();
  });
};
