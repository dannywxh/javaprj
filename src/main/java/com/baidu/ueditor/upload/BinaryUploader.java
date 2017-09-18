package com.baidu.ueditor.upload;

import com.baidu.ueditor.PathFormat;
import com.baidu.ueditor.define.AppInfo;
import com.baidu.ueditor.define.BaseState;
import com.baidu.ueditor.define.FileType;
import com.baidu.ueditor.define.State;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class BinaryUploader {

    public static final State save(HttpServletRequest request,
                                   Map<String, Object> conf) {
        FileItemStream fileStream = null;
        boolean isAjaxUpload = request.getHeader("X_Requested_With") != null;

        if (!ServletFileUpload.isMultipartContent(request)) {
            return new BaseState(false, AppInfo.NOT_MULTIPART_CONTENT);
        }

        ServletFileUpload upload = new ServletFileUpload(
                new DiskFileItemFactory());

        if (isAjaxUpload) {
            upload.setHeaderEncoding("UTF-8");
        }

        try {
            FileItemIterator iterator = upload.getItemIterator(request);

            while (iterator.hasNext()) {
                fileStream = iterator.next();

                if (!fileStream.isFormField())
                    break;
                fileStream = null;
            }

            if (fileStream == null) {
                return new BaseState(false, AppInfo.NOTFOUND_UPLOAD_DATA);
            }

            String savePath = (String) conf.get("savePath");
            String originFileName = fileStream.getName();

            String suffix = FileType.getSuffixByFilename(originFileName);

            originFileName = originFileName.substring(0,
                    originFileName.length() - suffix.length());
            savePath = savePath + suffix;

            long maxSize = ((Long) conf.get("maxSize")).longValue();

            if (!validType(suffix, (String[]) conf.get("allowFiles"))) {
                return new BaseState(false, AppInfo.NOT_ALLOW_FILE_TYPE);
            }

            savePath = PathFormat.parse(savePath, originFileName);

            String physicalPath = (String) conf.get("rootPath") + savePath;

            InputStream is = fileStream.openStream();
            State storageState = StorageManager.saveFileByInputStream(is,
                    physicalPath, maxSize);
            is.close();

            if (storageState.isSuccess()) {
                //采用基于网站根路径的相对路径
                String contentPath = request.getContextPath();
                String saveContentPath = PathFormat.format(savePath);
                if (!saveContentPath.startsWith(contentPath)) {
                    storageState.putInfo("url", contentPath + saveContentPath);
                } else {
                    storageState.putInfo("url", saveContentPath);
                }
                storageState.putInfo("type", suffix);
                storageState.putInfo("original", originFileName + suffix);

                //System.out.println(request.getParameter("action"));
                if ("uploadimage".equals(request.getParameter("action"))) {
                    ImageSize imageSize = getImageSizeByBufferedImage(physicalPath);
                    storageState.putInfo("width", imageSize.width);
                    storageState.putInfo("height", imageSize.height);
                    //System.out.println(imageSize.width);

                }
            }

            return storageState;
        } catch (FileUploadException e) {
            return new BaseState(false, AppInfo.PARSE_REQUEST_ERROR);
        } catch (IOException e) {
            System.out.println(e.getStackTrace());
        }
        return new BaseState(false, AppInfo.IO_ERROR);
    }

    private static boolean validType(String type, String[] allowTypes) {
        List<String> list = Arrays.asList(allowTypes);

        return list.contains(type);
    }

    public static ImageSize getImageSizeByBufferedImage(String src) {
        File file = new File(src);
        FileInputStream is = null;
        try {
            is = new FileInputStream(file);
        } catch (FileNotFoundException e2) {
            e2.printStackTrace();
        }
        BufferedImage sourceImg = null;
        try {
            sourceImg = javax.imageio.ImageIO.read(is);
            //System.out.println("width:" + sourceImg.getWidth());
            //System.out.println("height:" + sourceImg.getHeight());

            ImageSize imageSize = new ImageSize();
            imageSize.width = sourceImg.getWidth();
            imageSize.height = sourceImg.getHeight();

            // if (imageSize.width > 50 || imageSize.height > 100) {
            // if (imageSize.width > 50) {
            double fat = 500.0 / imageSize.width;
            //System.out.println(fat);
            //System.out.println(imageSize.width * fat);
            imageSize.width = (int) (imageSize.width * fat);
            imageSize.height = (int) (imageSize.height * fat);
            // }

            // }

            return imageSize;
        } catch (IOException e1) {
            e1.printStackTrace();
        }
        return new ImageSize();
    }

    public static class ImageSize {
        public int width = 0;
        public int height = 0;

    }
}
