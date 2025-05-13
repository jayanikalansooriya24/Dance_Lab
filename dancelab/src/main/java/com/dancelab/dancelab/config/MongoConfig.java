package com.dancelab.dancelab.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

@Configuration
public class MongoConfig {

    @Bean
    public MappingMongoConverter mappingMongoConverter(
            MongoDatabaseFactory factory,
            MongoCustomConversions conversions,
            MongoMappingContext context) {

        // use default DbRef resolver
        DbRefResolver dbRefResolver = new DefaultDbRefResolver(factory);
        MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, context);

        // ⬇ this tells Spring NOT to write or read any _class field
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));

        converter.setCustomConversions(conversions);
        return converter;
    }
}