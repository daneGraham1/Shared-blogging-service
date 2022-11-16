//TinyMCE configuration

tinymce.init({
    selector: 'textarea#submitPost-tinymce-app',
    plugins: 'lists link image table code help wordcount media preview fullscreen',
    toolbar: 'link image media bold italic underline',
    image_title: false,
    images_file_types: 'jpeg,jpg,svg,png,gif,bmp',
    file_picker_types: 'image',
    automatic_uploads: false,
    images_upload_handler: uploadImages,
   
    
  });

  tinymce.init({
    selector: 'textarea#updatePost-tinymce-app',
    plugins: 'lists link image table code help wordcount media preview fullscreen',
    toolbar: 'link image media bold italic underline',
    image_title: true,
    file_picker_types: 'image',
    automatic_uploads: false,
    images_upload_handler: uploadImages,
  });
  
  async function uploadImages() {
    const editor = tinymce.activeEditor;
    await editor.uploadImages(); 
    
  };

  
