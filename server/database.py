from uuid import uuid4
from peewee import SqliteDatabase, TextField, Model

DATABASE = 'appdata.db'

database = SqliteDatabase(DATABASE)


class BaseModel(Model):
    class Meta:
        database = database


class Server(BaseModel):
    id = TextField(primary_key=True, default=uuid4())
    name = TextField()
    host = TextField()
    username = TextField()
    password = TextField()


def create_tables():
    with database:
        database.create_tables([Server])
