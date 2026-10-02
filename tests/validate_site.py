from html.parser import HTMLParser
from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.fragment_links = []
        self.local_assets = []
        self.images_without_alt = []
        self.buttons_without_type = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if "id" in data:
            self.ids.add(data["id"])

        if tag == "a":
            href = data.get("href", "")
            if href.startswith("#") and href != "#":
                self.fragment_links.append(href[1:])

        if tag in {"img", "script", "link"}:
            key = {"img": "src", "script": "src", "link": "href"}[tag]
            value = data.get(key)
            if value and not re.match(r"^(https?:|//|data:|#)", value):
                self.local_assets.append(value.lstrip("./"))

        if tag == "img" and not data.get("alt"):
            self.images_without_alt.append(data.get("src", "<unknown>"))

        if tag == "button" and not data.get("type"):
            self.buttons_without_type.append(data.get("class", "<unclassified>"))


def fail(message):
    print(f"ERROR: {message}")
    sys.exit(1)


text = HTML.read_text(encoding="utf-8")
parser = SiteParser()
parser.feed(text)

missing_fragments = sorted(set(parser.fragment_links) - parser.ids)
if missing_fragments:
    fail(f"Missing fragment targets: {missing_fragments}")

missing_assets = sorted(
    asset for asset in set(parser.local_assets) if not (ROOT / asset).exists()
)
if missing_assets:
    fail(f"Missing local assets: {missing_assets}")

if parser.images_without_alt:
    fail(f"Images missing alt text: {parser.images_without_alt}")

if parser.buttons_without_type:
    fail(f"Buttons missing explicit type: {parser.buttons_without_type}")

if re.search(r"(December 2024|January 2025|February 2025)", text):
    fail("Stale 2024-2025 conference schedule remains in index.html")

if 'href="#"' in text:
    fail('Dead href="#" links remain in index.html')

js = (ROOT / "Script.js").read_text(encoding="utf-8")
if "innerHTML" in js:
    fail("Script.js uses innerHTML; prefer safe DOM construction")

print("Static-site validation passed.")
