from PIL import Image

def generate_8bit_image(input_path, output_path, scale_factor=16):
    # Open the input image
    img = Image.open(input_path)
    
    # Reduce the image size by the scale factor
    small_img = img.resize(
        (img.width // scale_factor, img.height // scale_factor), Image.NEAREST
    )
    
    # Scale it back up to create a pixelated effect
    result = small_img.resize(
        (img.width, img.height), Image.NEAREST
    )
    
    # Convert the image to a palette-based (8-bit) mode
    result = result.convert("P", palette=Image.ADAPTIVE, colors=256)
    
    # Save the resulting image
    result.save(output_path)
    print(f"8-bit image saved to {output_path}")

# Example usage:
# generate_8bit_image("input_image.png", "output_image.png", scale_factor=16)
