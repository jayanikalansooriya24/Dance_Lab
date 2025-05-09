package com.dancelab.dancelab.service;

import com.dancelab.dancelab.Model.DanceVideo;
import com.dancelab.dancelab.Model.User;
import com.dancelab.dancelab.Model.Audio;
import com.dancelab.dancelab.repository.DanceVideoRepository;
import com.dancelab.dancelab.repository.AudioRepository;
import com.google.cloud.storage.Blob;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class VideoService {

    @Autowired
    private DanceVideoRepository danceVideoRepository;

    @Autowired
    private AudioRepository audioRepository;

    public String uploadVideo(MultipartFile file, String title, String style, String difficulty, boolean muteAudio, String audioId, User user) {
        try {
            StorageClient storage = StorageClient.getInstance();
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Blob blob = storage.bucket().create(fileName, file.getInputStream(), file.getContentType());
            String videoUrl = blob.getMediaLink();

            Audio audio = null;
            if (muteAudio && audioId != null) {
                audio = audioRepository.findById(audioId).orElse(null);
                if (audio != null) {
                    // TODO: Merge the audio and video using FFmpeg (optional feature)
                }
            }

            DanceVideo video = new DanceVideo();
            video.setTitle(title);
            video.setVideoUrl(videoUrl);
            video.setStyle(style);
            video.setDifficulty(difficulty);
            

            danceVideoRepository.save(video);

            return videoUrl;

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
