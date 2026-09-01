import os
import uuid
from fastapi import UploadFile
from app.config import settings

class StorageService:
    def __init__(self):
        self.upload_dir = settings.STORAGE_LOCAL_DIR
        os.makedirs(self.upload_dir, exist_ok=True)

    async def save_file(self, file: UploadFile, subfolder: str = "media") -> str:
        folder = os.path.join(self.upload_dir, subfolder)
        os.makedirs(folder, exist_ok=True)
        
        file_ext = os.path.splitext(file.filename)[1] if file.filename else ".bin"
        unique_filename = f"{uuid.uuid4().hex}{file_ext}"
        file_path = os.path.join(folder, unique_filename)
        
        content = await file.read()
        with open(file_path, "wb") as f:
            f.write(content)
            
        # Return public relative path
        return f"/uploads/{subfolder}/{unique_filename}"

storage_service = StorageService()
