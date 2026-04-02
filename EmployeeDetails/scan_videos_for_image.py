#!/usr/bin/env python3
"""
Scan videos for a target image and print video names where a match is found.

Usage:
  python scan_videos_for_image.py \
    --videos-dir /path/to/videos \
    --image /path/to/reference.png \
    --threshold 0.85 \
    --sample-seconds 1.0
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import cv2


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Search for an image inside videos and print matching video names."
    )
    parser.add_argument(
        "--videos-dir",
        required=True,
        type=Path,
        help="Directory containing video files.",
    )
    parser.add_argument(
        "--image",
        required=True,
        type=Path,
        help="Path to the reference image to search for.",
    )
    parser.add_argument(
        "--threshold",
        type=float,
        default=0.85,
        help="Template matching threshold between 0 and 1 (default: 0.85).",
    )
    parser.add_argument(
        "--sample-seconds",
        type=float,
        default=1.0,
        help="Check one frame every N seconds (default: 1.0).",
    )
    parser.add_argument(
        "--extensions",
        nargs="+",
        default=[".mp4", ".mov", ".mkv", ".avi", ".webm", ".m4v"],
        help="Video extensions to scan (default: common formats).",
    )
    return parser.parse_args()


def collect_videos(videos_dir: Path, extensions: list[str]) -> list[Path]:
    exts = {ext.lower() if ext.startswith(".") else f".{ext.lower()}" for ext in extensions}
    return sorted(
        [
            p
            for p in videos_dir.iterdir()
            if p.is_file() and p.suffix.lower() in exts
        ]
    )


def search_image_in_video(
    video_path: Path,
    template_gray,
    threshold: float,
    sample_seconds: float,
) -> tuple[bool, float, float]:
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        return False, 0.0, 0.0

    fps = cap.get(cv2.CAP_PROP_FPS)
    if not fps or fps <= 0:
        fps = 25.0

    frame_step = max(1, int(round(fps * sample_seconds)))

    best_score = 0.0
    best_time = 0.0
    frame_index = 0

    template_h, template_w = template_gray.shape[:2]

    while True:
        ok, frame = cap.read()
        if not ok:
            break

        if frame_index % frame_step != 0:
            frame_index += 1
            continue

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        frame_h, frame_w = gray.shape[:2]

        if template_h > frame_h or template_w > frame_w:
            frame_index += 1
            continue

        result = cv2.matchTemplate(gray, template_gray, cv2.TM_CCOEFF_NORMED)
        _, max_val, _, _ = cv2.minMaxLoc(result)

        if max_val > best_score:
            best_score = float(max_val)
            best_time = frame_index / fps

        if max_val >= threshold:
            cap.release()
            return True, float(max_val), frame_index / fps

        frame_index += 1

    cap.release()
    return False, best_score, best_time


def main() -> int:
    args = parse_args()

    if not args.videos_dir.exists() or not args.videos_dir.is_dir():
        print(f"Error: videos directory not found: {args.videos_dir}", file=sys.stderr)
        return 1

    if not args.image.exists() or not args.image.is_file():
        print(f"Error: reference image not found: {args.image}", file=sys.stderr)
        return 1

    if not (0.0 <= args.threshold <= 1.0):
        print("Error: threshold must be between 0 and 1.", file=sys.stderr)
        return 1

    if args.sample_seconds <= 0:
        print("Error: sample-seconds must be > 0.", file=sys.stderr)
        return 1

    template = cv2.imread(str(args.image), cv2.IMREAD_GRAYSCALE)
    if template is None:
        print(f"Error: failed to read image: {args.image}", file=sys.stderr)
        return 1

    videos = collect_videos(args.videos_dir, args.extensions)
    if not videos:
        print("No videos found to scan.")
        return 0

    print(f"Scanning {len(videos)} videos for image: {args.image.name}")
    print(f"Threshold: {args.threshold}, sample every {args.sample_seconds}s")

    found_any = False

    for video in videos:
        matched, score, timestamp = search_image_in_video(
            video,
            template,
            args.threshold,
            args.sample_seconds,
        )

        if matched:
            found_any = True
            print(
                f"FOUND: {video.name} (score={score:.3f}, time={timestamp:.2f}s)"
            )
        else:
            print(
                f"NOT FOUND: {video.name} "
                f"(best_score={score:.3f} at {timestamp:.2f}s)"
            )

    if found_any:
        print("Done. At least one matching video was found.")
        return 0

    print("Done. No matches found.")
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
