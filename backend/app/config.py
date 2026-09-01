import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
DEFAULT_DB_PATH = os.path.join(BASE_DIR, "jharkhand_samadhan.db").replace("\\", "/")
DEFAULT_STORAGE_DIR = os.path.join(BASE_DIR, "uploads")

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="allow")

    PROJECT_NAME: str = "India Samadhan Setu (National AI Problem-to-Impact Platform)"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        f"sqlite:///{DEFAULT_DB_PATH}"
    )
    
    # Security
    JWT_SECRET: str = os.getenv("JWT_SECRET", "india_sih_2026_super_secret_jwt_key_998877")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days for demo
    
    # AI Engine Configuration
    AI_MODE: str = os.getenv("AI_MODE", "mock") # "mock" or "api"
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "gemini") # "gemini", "openai", "claude"
    AI_API_KEY: Optional[str] = os.getenv("AI_API_KEY", None)
    AI_MODEL_NAME: str = os.getenv("AI_MODEL_NAME", "gemini-1.5-flash")
    
    # File Storage
    STORAGE_TYPE: str = os.getenv("STORAGE_TYPE", "local") # "local" or "s3"
    STORAGE_LOCAL_DIR: str = os.getenv("STORAGE_LOCAL_DIR", DEFAULT_STORAGE_DIR)
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

settings = Settings()
