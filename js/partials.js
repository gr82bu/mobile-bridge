angular.module('mbApp.services').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/partials/edit.html',
    "<div class=\"row\" style=\"min-height:160px; padding: 30px;\">\r" +
    "\n" +
    "    <div text-angular ng-model=\"content\" ta-toolbar=\"[file.type=='html' ? ['bold','italics', 'underline', 'strikethrough', 'localImage'] : ['bold','italics', 'underline', 'strikethrough']]\"></div>\r" +
    "\n" +
    "    <div class=\"row margin-top-15\">\r" +
    "\n" +
    "        <div class=\"col-sm-4 col-md-offset-4\">\r" +
    "\n" +
    "            <div ng-if=\"!file.id\" class=\"input-group\">\r" +
    "\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"img.name\" placeholder=\"file name\">\r" +
    "\n" +
    "                <span class=\"input-group-btn\">\r" +
    "\n" +
    "                    <button class=\"btn btn-default\" type=\"button\" ng-click=\"saveImg(img)\">Save</button>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-sm-4\">\r" +
    "\n" +
    "            <button ng-if=\"file.id\" class=\"btn btn-default\" ng-click=\"save()\">Save</button>\r" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-click=\"$dismiss()\">Cancel</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/partials/preview.html',
    "<div class=\"row\" style=\"min-height:160px; padding: 30px;text-align: center;\">\r" +
    "\n" +
    "    <img ng-src=\"{{dataUrl}}\" style=\"max-width: 500px;\"/>\r" +
    "\n" +
    "    <div ng-bind-html=\"content\" style=\"text-align: start\"></div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/partials/select.html',
    "<div style=\"padding:20px;\">\r" +
    "\n" +
    "    <div class=\"row\" style=\"margin:0\">\r" +
    "\n" +
    "        <a ng-repeat=\"photo in photos\" href=\"javascript:\" ng-click=\"$close(imgSrc(photo.data))\" style=\"width: 50px; height: 50px; margin: 0 14px 14px 0; display: inline-block;\">\r" +
    "\n" +
    "            <img ng-src=\"{{imgSrc(photo.data)}}\" style=\"max-width: 50px; height: 50px;\"/>\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/partials/upload.html',
    "<div class=\"row\" style=\"min-height:160px; text-align: center; padding: 30px;\">\r" +
    "\n" +
    "    <div ng-if=\"!img.src && !fbAlbum && !fbAlbumPhotos\" style=\"margin: 5% 0;\">\r" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-click=\"uploadFromFb()\">Upload from Facebook</button>\r" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-click=\"uploadFromPc()\">Upload from PC</button>\r" +
    "\n" +
    "        <input type=\"file\" style=\"display:none\" accept=\"image/*\" id=\"file\" name='file' ng-model=\"img.src\" input-file-change/>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-if=\"img.src && !fbAlbum && !fbAlbumPhotos\">\r" +
    "\n" +
    "        <img id=\"imgPreview\" ng-src=\"{{img.src}}\" style=\"max-width: 500px;\"/>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-if=\"fbAlbum\">\r" +
    "\n" +
    "        <a ng-repeat=\"album in albums\" href=\"javascript:\" ng-click=\"showAlbum(album.id)\" style=\"width: 100px; height: 100px; margin: 0 30px 40px 0; display: inline-block;\">\r" +
    "\n" +
    "            <img ng-src=\"{{album.cover}}\" style=\"max-width: 100px; height: 100px;\"/><span style=\"display: inline-block; width: 100px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;\">{{album.name}}</span>\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-if=\"fbAlbumPhotos\">\r" +
    "\n" +
    "        <a ng-repeat=\"photo in photos\" href=\"javascript:\" ng-click=\"previewFbPhoto(photo.source)\" style=\"width: 100px; height: 100px; margin: 0 30px 40px 0; display: inline-block;\">\r" +
    "\n" +
    "            <img ng-src=\"{{photo.source}}\" style=\"max-width: 100px; height: 100px;\"/>\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row margin-top-15\">\r" +
    "\n" +
    "        <div class=\"col-sm-4 col-md-offset-6\">\r" +
    "\n" +
    "            <div ng-if=\"img.src\" class=\"input-group\">\r" +
    "\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"img.name\" placeholder=\"file name\">\r" +
    "\n" +
    "                <span class=\"input-group-btn\">\r" +
    "\n" +
    "                    <button class=\"btn btn-default\" type=\"button\" ng-click=\"saveImg(img)\">Save</button>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"col-sm-2\">\r" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-click=\"$dismiss()\">Cancel</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

}]);
