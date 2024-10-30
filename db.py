from sqlmodel import create_engine, SQLModel, Session
from config import DATABASE_URL

def init_db():
    SQLModel.metadata.create_all(engine)


# Consider using environment variables for sensitive credentials
engine = create_engine(DATABASE_URL, echo=True)

# Get session for use in scripts or simple context
def get_session():
    with Session(engine) as session:
        yield session