package com.dancelab.dancelab.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/videos/**")
                .addResourceLocations("file:uploads/videos/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/videos/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET")
                .allowedHeaders("*");
    }
}