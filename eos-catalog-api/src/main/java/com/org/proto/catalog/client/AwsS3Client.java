package com.org.proto.catalog.client;

import java.util.Iterator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Slf4j
public class AwsS3Client {

    @Autowired
    private AmazonS3 amazonS3Client;

    @Value("${application.bucket.name}")
    private String bucketName;

    @Value("${cloud.aws.region.static}")
    private String region;

    public String uploadFile(String keyName, MultipartFile file) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(bucketName, keyName, file.getInputStream(), metadata);
            return "https://"+bucketName+".s3."+region+".amazonaws.com/"+keyName;
        } catch (IOException ioe) {
            log.error("IOException: " + ioe.getMessage());
        } catch (AmazonServiceException serviceException) {
            log.info("AmazonServiceException: "+ serviceException.getMessage());
            throw serviceException;
        } catch (AmazonClientException clientException) {
            log.info("AmazonClientException Message: " + clientException.getMessage());
            throw clientException;
        }
        return null;
    }

    public Boolean deleteFile(final String fileName) {
        amazonS3Client.deleteObject(bucketName, fileName);
        return true;
    }

    public Boolean deleteFile() {
        ObjectListing object_listing = amazonS3Client.listObjects(bucketName);
        while (true) {
            for (Iterator<?> iterator =
                 object_listing.getObjectSummaries().iterator();
                 iterator.hasNext(); ) {
                S3ObjectSummary summary = (S3ObjectSummary) iterator.next();
                amazonS3Client.deleteObject(bucketName, summary.getKey());
            }
            if (object_listing.isTruncated()) {
                object_listing = amazonS3Client.listNextBatchOfObjects(object_listing);
            } else {
                break;
            }
        }
        return true;
    }

}
