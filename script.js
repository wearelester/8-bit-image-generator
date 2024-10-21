document.getElementById('upload').addEventListener('change', handleImageUpload);
document.getElementById('download').addEventListener('click', downloadImage);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = function() {
            const scaleFactor = 16; // Adjust this for more or less pixelation
            create8BitImage(img, scaleFactor);
        }
    };

    reader.readAsDataURL(file);
}

function create8BitImage(img, scaleFactor) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set the canvas size to the image size
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Draw the image to the canvas at a smaller size
    const smallCanvas = document.createElement('canvas');
    const smallCtx = smallCanvas.getContext('2d');
    smallCanvas.width = img.width / scaleFactor;
    smallCanvas.height = img.height / scaleFactor;
    
    smallCtx.drawImage(img, 0, 0, smallCanvas.width, smallCanvas.height);
    
    // Draw the small image back onto the original canvas, scaling it up
    ctx.imageSmoothingEnabled = false; // Disable smoothing to keep pixelated look
    ctx.drawImage(smallCanvas, 0, 0, canvas.width, canvas.height);
}

function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = '8bit_image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
