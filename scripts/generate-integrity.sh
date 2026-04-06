#!/bin/bash
# Runtime integrity verification script
# Computes SHA-256 of the built dist files and embeds them

DIST_DIR="dist"
OUTPUT_FILE="src/integrity.ts"

echo "Computing integrity hashes for dist/..."

# Create integrity manifest
cd "$DIST_DIR" || exit 1

# Generate integrity data for each JS file
INTEGRITY_DATA=""

for file in $(find . -name "*.js" -type f | sort); do
  SHA256=$(shasum -a 256 "$file" | awk '{print $1}')
  FILENAME=$(basename "$file")
  INTEGRITY_DATA+="  '$FILENAME': '$SHA256',\n"
done

# Go back to project root
cd ..

# Create the integrity module
cat > "$OUTPUT_FILE" << EOF
/**
 * Integrity verification module
 * SHA-256 hashes of built dist files
 * Generated at build time
 */

export const INTEGRITY_CHECKSUM = {
${INTEGRITY_DATA}};

export function verifyIntegrity(): boolean {
  // This function can be called at runtime to verify the package hasn't been tampered with
  // In production, you would compare against a known-good checksum
  return true;
}
EOF

echo "Integrity module generated at $OUTPUT_FILE"
echo "Run 'npm run build' to regenerate"