"""
Database Migration Runner
Runs Alembic or SQLAlchemy schema synchronization.
"""

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../backend")))

from app.database import engine, Base
import app.models

def run_migrations():
    print("Applying schema migrations to target database...")
    Base.metadata.create_all(bind=engine)
    print("Database tables synchronized successfully.")

if __name__ == "__main__":
    run_migrations()
