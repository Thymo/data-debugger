from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Data debugger"
    # db_url: str = "mongodb://mongo:27017"
    db_url: str = "mongodb://localhost:27017"
    db_name: str = 'data-debugger'


settings = Settings()
