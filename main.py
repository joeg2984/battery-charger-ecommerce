from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from supabase import create_client, Client
import os
import sys
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

# Load environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in the environment variables.")

try:
    from supabase import create_client, Client
    print("Supabase module imported successfully.")
except ModuleNotFoundError:
    print("Supabase module not found.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class Product(BaseModel):
    id: str
    name: str
    description: str = None
    price: float
    stock: int
    image_url: str = None
    created_at: str = None
    updated_at: str = None

class ProductCreate(BaseModel):
    name: str
    description: str = None
    price: float
    stock: int
    image_url: str = None

class ProductUpdate(BaseModel):
    name: str = None
    description: str = None
    price: float = None
    stock: int = None
    image_url: str = None

@app.get("/products", response_model=List[Product])
def get_products():
    response = supabase.table("products").select("*").execute()
    if response.error:
        raise HTTPException(status_code=500, detail=response.error.message)
    return response.data

@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: str):
    response = supabase.table("products").select("*").eq("id", product_id).single().execute()
    if response.error:
        raise HTTPException(status_code=404, detail="Product not found")
    return response.data

@app.post("/products", response_model=Product)
def create_product(product: ProductCreate):
    response = supabase.table("products").insert(product.dict()).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return response.data[0]

@app.put("/products/{product_id}", response_model=Product)
def update_product(product_id: str, product: ProductUpdate):
    response = supabase.table("products").update(product.dict(exclude_unset=True)).eq("id", product_id).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    if not response.data:
        raise HTTPException(status_code=404, detail="Product not found")
    return response.data[0]

@app.delete("/products/{product_id}")
def delete_product(product_id: str):
    response = supabase.table("products").delete().eq("id", product_id).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    if response.count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

