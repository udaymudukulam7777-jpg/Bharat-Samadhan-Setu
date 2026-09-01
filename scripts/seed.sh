#!/bin/bash
echo "Seeding realistic Jharkhand dataset..."
python3 "$(dirname "$0")/../database/seed/seed_data.py"
echo "Seed complete!"
