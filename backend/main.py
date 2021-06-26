from typing import Optional, List
import pymongo
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseSettings, BaseModel, Field

import config
from cluster_debugger import get_confused_clusters
from confused_debugger import enrich_confused_items
from utils import seed_database

app = FastAPI()

settings = config.settings

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class DataItem(BaseModel):
    id: Optional[str] = None
    text: Optional[str] = None
    intent: Optional[str] = None
    similarity: Optional[float] = None
    score: Optional[float] = None
    minority_label: Optional[bool] = None


DataItemGroup = List[DataItem]


@app.get("/")
async def read_root():
    return {'status': 'online'}


@app.get("/confused-items", response_model=List[DataItemGroup])
async def read_confused_items():
    data = [d async for d in app.db['data'].find({'complete': True})]
    confused_items = await app.db['data'].find({'complete': True}).sort('score', pymongo.DESCENDING).to_list(length=100)
    output = enrich_confused_items(confused_items, data)

    return output


@app.get("/cluster-items", response_model=List[DataItemGroup])
async def read_cluster_items(threshold: Optional[float] = 0.85):
    data = [d async for d in app.db['data'].find({'complete': True})]
    output = get_confused_clusters(data, threshold)
    return output


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(settings.db_url)
    app.db = app.mongodb_client[settings.db_name]
    await seed_database(app.db)


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()
