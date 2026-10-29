"""Retouch dish photos: white balance, auto levels, vibrance, sharpen, 4:5 + square crops.

Usage: python3 tools/process_photos.py <dir with originals>  -> assets/food/<name>.webp, <name>-sq.webp
"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter, ImageOps

# Horizontal/vertical focus (0..1) for the crop, per dish.
FOCUS = {"barszcz": (0.43, 0.5), "jajka-boczek": (0.5, 0.5)}
# Dishes that also get a landscape crop (hero).
WIDE = {"barszcz"}
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "food")


def grade(im):
    a = np.asarray(im.convert("RGB")).astype(np.float32) / 255
    # Gray-world white balance, applied at 70% so food keeps its warmth.
    means = a.reshape(-1, 3).mean(0)
    gain = means.mean() / means
    a *= 1 + (gain - 1) * 0.7
    # Auto levels on luminance (0.4% / 99.6%).
    lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    lo, hi = np.percentile(lum, [0.4, 99.6])
    a = (a - lo) / max(hi - lo, 1e-3)
    a = np.clip(a, 0, 1)
    # Gentle S-curve for contrast.
    a = a + 0.35 * a * (1 - a) * (2 * a - 1)
    a = np.clip(a, 0, 1)
    # Vibrance: boost low-saturation pixels more than saturated ones.
    mx, mn = a.max(2, keepdims=True), a.min(2, keepdims=True)
    sat = mx - mn
    mean = a.mean(2, keepdims=True)
    a = mean + (a - mean) * (1 + 0.28 * (1 - sat))
    # Slight warmth.
    a[..., 0] *= 1.015
    a[..., 2] *= 0.985
    out = Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))
    return out


def crop(im, ratio, focus):
    w, h = im.size
    fx, fy = focus
    if w / h > ratio:
        nw = int(h * ratio)
        x = int(min(max(fx * w - nw / 2, 0), w - nw))
        return im.crop((x, 0, x + nw, h))
    nh = int(w / ratio)
    y = int(min(max(fy * h - nh / 2, 0), h - nh))
    return im.crop((0, y, w, y + nh))


def main(src):
    os.makedirs(OUT, exist_ok=True)
    for f in sorted(os.listdir(src)):
        name, _ = os.path.splitext(f)
        im = ImageOps.exif_transpose(Image.open(os.path.join(src, f)))
        im = grade(im)
        focus = FOCUS.get(name, (0.5, 0.5))
        variants = [("", 4 / 5, (1000, 1250)), ("-sq", 1, (480, 480))]
        if name in WIDE:
            variants.append(("-wide", 4 / 3, (1200, 900)))
        for suffix, ratio, size in variants:
            c = crop(im, ratio, focus).resize(size, Image.LANCZOS)
            c = c.filter(ImageFilter.UnsharpMask(radius=1.2, percent=70 if suffix else 55, threshold=2))
            c.save(os.path.join(OUT, f"{name}{suffix}.webp"), "WEBP", quality=80, method=6)
        print(name)


if __name__ == "__main__":
    main(sys.argv[1])
