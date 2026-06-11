package com.cesar.cumpleapp.controller;

import com.cesar.cumpleapp.dto.UploadResponseCloudinary;
import com.cesar.cumpleapp.service.CloudinaryService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
//@CrossOrigin(origins = "http://localhost:5173")
public class UploadController {

    private final CloudinaryService cloudinaryService;

    public UploadController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping
    public UploadResponseCloudinary upload(
            @RequestParam("file")
            MultipartFile file
    ) throws Exception {

        String url =
                cloudinaryService.uploadFile(file);

        return new UploadResponseCloudinary(url);
    }
}