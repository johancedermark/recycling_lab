#!/usr/bin/env python3
"""
Genererar bakgrundsbild till återvinningsspelet via gpt-image-1.

Kör: python setup.py
Kräver: pip install openai  och  OPENAI_API_KEY satt som miljövariabel
"""

import base64
import os
import sys
from pathlib import Path

PROMPT = (
    "Eye-level first-person perspective standing at an industrial automated recycling "
    "conveyor belt in a modern Swedish sorting facility. The wide belt runs across the "
    "foreground carrying mixed recyclables toward the viewer — plastic bottles, glass "
    "jars, aluminum cans, cardboard boxes tumbling along. Dramatic overhead industrial "
    "LED lighting casting strong shadows. In the background: large collection hoppers "
    "and chutes in yellow, blue, grey and green. Galvanized steel structures, clean "
    "concrete floor. Slightly stylized photorealistic digital art, cinematic lighting, "
    "suitable as a video game environment background. No text, no people. "
    "Ultra-wide 16:9 panoramic view, high detail."
)


def main() -> None:
    try:
        from openai import OpenAI
    except ImportError:
        sys.exit("Installera openai-paketet: pip install openai")

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        sys.exit(
            "Saknar API-nyckel. Sätt miljövariabeln OPENAI_API_KEY och försök igen."
        )

    client = OpenAI(api_key=api_key)

    print("Genererar bakgrundsbild med gpt-image-2 (tar ca 15 sekunder)…")
    response = client.images.generate(
        model="gpt-image-2",
        prompt=PROMPT,
        size="1536x1024",
        quality="high",
        n=1,
    )

    assets_dir = Path(__file__).parent / "assets"
    assets_dir.mkdir(exist_ok=True)
    dest = assets_dir / "bg.png"

    image_data = response.data[0]
    if getattr(image_data, "b64_json", None):
        dest.write_bytes(base64.b64decode(image_data.b64_json))
    else:
        import urllib.request
        urllib.request.urlretrieve(image_data.url, dest)

    print(f"✓ Bakgrundsbild sparad: {dest}")
    print("Starta spelet med:  python server.py")


if __name__ == "__main__":
    main()
