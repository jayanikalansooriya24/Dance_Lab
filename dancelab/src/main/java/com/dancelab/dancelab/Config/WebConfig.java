package com.dancelab.dancelab.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Apply to all API endpoints
                .allowedOrigins("http://localhost:5173")  // Allow frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);  // Allow credentials (cookies, authentication)

        registry.addMapping("/**")  // Apply to all other endpoints
                .allowedOrigins("http://localhost:5173")  // Allow frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);  // Allow credentials (cookies, authentication)
        //video upload access
        registry.addMapping("/videos/**")  // Apply to video upload endpoint
                .allowedOrigins("http://localhost:5173")  // Allow frontend URL
                .allowedMethods("POST")
                .allowedHeaders("*")
                .allowCredentials(true);  // Allow credentials (cookies, authentication)
    }

}
