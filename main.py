from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in the environment variables.")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize FastAPI app
app = FastAPI()

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Product Models
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

# Product Endpoints
@app.get("/products", response_model=List[Product])
def get_products():
    response = supabase.table("products").select("*").execute()
    if response.error:
        raise HTTPException(status_code=500, detail=response.error.message)
    return response.data

@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: str):
    response = supabase.table("products").select("*").eq("id", product_id).single().execute()
    if response.error or not response.data:
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

# Profile Models
class Profile(BaseModel):
    id: str
    user_id: str
    name: str
    email: str
    created_at: str = None
    updated_at: str = None

class ProfileCreate(BaseModel):
    user_id: str
    name: str
    email: str

class ProfileUpdate(BaseModel):
    name: str = None
    email: str = None

# Profile Endpoints
@app.get("/profiles", response_model=List[Profile])
def get_profiles():
    response = supabase.table("profiles").select("*").execute()
    if response.error:
        raise HTTPException(status_code=500, detail=response.error.message)
    return response.data

@app.get("/profiles/{profile_id}", response_model=Profile)
def get_profile(profile_id: str):
    response = supabase.table("profiles").select("*").eq("id", profile_id).single().execute()
    if response.error or not response.data:
        raise HTTPException(status_code=404, detail="Profile not found")
    return response.data

@app.post("/profiles", response_model=Profile)
def create_profile(profile: ProfileCreate):
    response = supabase.table("profiles").insert(profile.dict()).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return response.data[0]

@app.put("/profiles/{profile_id}", response_model=Profile)
def update_profile(profile_id: str, profile: ProfileUpdate):
    response = supabase.table("profiles").update(profile.dict(exclude_unset=True)).eq("id", profile_id).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    if not response.data:
        raise HTTPException(status_code=404, detail="Profile not found")
    return response.data[0]

@app.delete("/profiles/{profile_id}")
def delete_profile(profile_id: str):
    response = supabase.table("profiles").delete().eq("id", profile_id).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    if response.count == 0:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"message": "Profile deleted successfully"}
