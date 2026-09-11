# Downloads self-hosted font + icon assets for fusion4events.com
# Run from the repo root:  powershell -ExecutionPolicy Bypass -File tools\download-assets.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

# --- Barlow & Barlow Condensed (fontsource builds via jsDelivr) ---
$fontDir = Join-Path $root "fonts\files"
New-Item -ItemType Directory -Force -Path $fontDir | Out-Null
$files = @()
foreach ($w in 300,400,500,600) { $files += "barlow-latin-$w-normal.woff2" }
foreach ($w in 300,400)         { $files += "barlow-latin-$w-italic.woff2" }
foreach ($w in 300,400,600,700,800,900) { $files += "barlow-condensed-latin-$w-normal.woff2" }
foreach ($w in 700,800)         { $files += "barlow-condensed-latin-$w-italic.woff2" }
foreach ($f in $files) {
    $pkg = if ($f.StartsWith("barlow-condensed")) { "barlow-condensed" } else { "barlow" }
    $url = "https://cdn.jsdelivr.net/npm/@fontsource/$pkg@5/files/$f"
    Write-Host "  $f"
    Invoke-WebRequest -Uri $url -OutFile (Join-Path $fontDir $f)
}

# --- Font Awesome 6.5.0 (css + webfonts) ---
$faCss = Join-Path $root "vendor\fontawesome\css"
$faFonts = Join-Path $root "vendor\fontawesome\webfonts"
New-Item -ItemType Directory -Force -Path $faCss, $faFonts | Out-Null
Invoke-WebRequest "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" -OutFile (Join-Path $faCss "all.min.css")
foreach ($f in "fa-solid-900.woff2","fa-solid-900.ttf","fa-brands-400.woff2","fa-brands-400.ttf","fa-regular-400.woff2","fa-regular-400.ttf") {
    Write-Host "  $f"
    Invoke-WebRequest "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/$f" -OutFile (Join-Path $faFonts $f)
}
Write-Host "`nDone. Commit the fonts/ and vendor/ folders and push."
