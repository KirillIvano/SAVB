import asyncio
from peewee import *
import peewee_async
import settings

database = peewee_async.PostgresqlDatabase(
    'savb',
    user='kirill',
    password=settings.DB_PASSWORD,
    host='194.67.109.99',
    port=5432,

    autocommit=True,
)


class BaseModel(Model):
    class Meta:
        database = database


class Admin(BaseModel):
    admin_id = PrimaryKeyField()
    token = CharField()


class Bot(BaseModel):
    bot_id = PrimaryKeyField()
    token = CharField()
    name = CharField()
    admin_id = ForeignKeyField(Admin, backref='belongs_to')


class User(BaseModel):
    user_id = PrimaryKeyField()
    access_token = CharField(max_length=512, null=True)


class DialogState(BaseModel):
    state_id = PrimaryKeyField()
    bot_id = ForeignKeyField(Bot) 


class Dialog(BaseModel):
    bot_id = ForeignKeyField(Bot)
    user_id = ForeignKeyField(User)
    current_state_id = ForeignKeyField(DialogState)


class Action(BaseModel):
    action_id = PrimaryKeyField()
    target_state_id = ForeignKeyField(DialogState)


class BotMessage(BaseModel):
    message_id = PrimaryKeyField()
    bot_id = ForeignKeyField(Bot)
    text = CharField()
    action_id = ForeignKeyField(Action)


class Trigger(BaseModel):
    trigger_id = PrimaryKeyField()
    initial_state_id = ForeignKeyField(DialogState)
    action_id = ForeignKeyField(Action)


class UserMessage(BaseModel):
    message_id = PrimaryKeyField()
    text = CharField()
    trigger_id = ForeignKeyField(Trigger)


class KeyboardButton(BaseModel):
    button_id = PrimaryKeyField()
    text = CharField()
    color = CharField()
    inline = BooleanField()
    trigger_id = ForeignKeyField(Trigger)


class Log(BaseModel):
    log_id = PrimaryKeyField()
    status = IntegerField()
    date = DateTimeField()
    req_data = CharField()
    method = CharField()
    url = CharField()
    res_data = CharField(null=True)
    error = CharField(null=True)


# database.connect(reuse_if_open=True)
# database.close()

loop = asyncio.new_event_loop()
objects = peewee_async.Manager(database, loop=loop)
database.set_allow_sync(False)
