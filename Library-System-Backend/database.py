from pymongo import MongoClient
from models import User
from dotenv import load_dotenv
import os 

# Load environment variables from .env
load_dotenv()

# MongoDB connection
client = MongoClient(os.getenv('MONGO_URI'))
db = client["library"]

# collections
users_collection = db["users"]
books_collection = db["books"]
reviews_collection = db["reviews"]
carts_collection = db["carts"]


# model instances
user_model = User(users_collection)
book_model = User(books_collection)
review_model = User(reviews_collection)
cart_model = User(carts_collection)