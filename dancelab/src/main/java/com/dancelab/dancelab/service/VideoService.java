package com.dancelab.dancelab.service;

import com.dancelab.dancelab.Model.DanceVideo;  // Ensure this import is present
import com.dancelab.dancelab.Model.User;  // Add this import for User class
import com.dancelab.dancelab.Model.Audio;  // Import the Audio class
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

    public String uploadVideo(MultipartFile file, String title, String style, String difficulty, boolean muteAudio, Long audioId, User user) {
        try {
            // Upload video to Firebase Storage
            StorageClient storage = StorageClient.getInstance();
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Blob blob = storage.bucket().create(fileName, file.getInputStream(), file.getContentType());
            String videoUrl = blob.getMediaLink();  // Define videoUrl here

            // If audio needs to be muted and replaced with another one
            Audio audio = null;
            if (muteAudio && audioId != null) {
                audio = audioRepository.findById(audioId).orElse(null);
                if (audio != null) {
                    // TODO: Merge the audio and video using FFmpeg (Server-side logic goes here)
                    // Example: You can call FFmpeg command to combine audio with video.
                }
            }

            // Create new DanceVideo object and save
            DanceVideo video = new DanceVideo();
            video.setTitle(title);
            video.setVideoUrl(videoUrl);  // Set videoUrl here
            video.setStyle(style);  // Dynamically passed style
            video.setDifficulty(difficulty);  // Dynamically passed difficulty
            video.setRating(0); // Default rating (could be changed later)
            video.setUser(user);  // Set the user for the video
            video.setAudio(audio); // The audio to be used for the video

            // Save video to repository
            danceVideoRepository.save(video);

            return videoUrl;  // Return the videoUrl

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
