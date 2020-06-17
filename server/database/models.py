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


class Bot(BaseModel):
    bot_id = PrimaryKeyField()
    token = CharField()
    name = CharField()
    secret_key = CharField(max_length=50)
    confirmation_token = CharField(max_length=10)


class Admin(BaseModel):
    admin_id = PrimaryKeyField()
    token = CharField()


class BotAdmin(BaseModel):
    admin_id = ForeignKeyField(Admin)
    bot_id = ForeignKeyField(Bot)


class User(BaseModel):
    user_id = PrimaryKeyField()


class DialogState(BaseModel):
    state_id = AutoField()
    bot_id = ForeignKeyField(Bot) 


class Dialog(BaseModel):
    bot_id = ForeignKeyField(Bot)
    user_id = ForeignKeyField(User)
    current_state_id = ForeignKeyField(DialogState)


class Action(BaseModel):
    action_id = AutoField()
    target_state_id = ForeignKeyField(DialogState)


class BotMessage(BaseModel):
    message_id = AutoField()
    bot_id = ForeignKeyField(Bot)
    text = CharField()
    action_id = ForeignKeyField(Action)


class Trigger(BaseModel):
    trigger_id = AutoField()
    initial_state_id = ForeignKeyField(DialogState, DialogState.state_id)
    action_id = ForeignKeyField(Action)


class UserMessage(BaseModel):
    message_id = AutoField()
    text = CharField()
    trigger_id = ForeignKeyField(Trigger)


class KeyboardButton(BaseModel):
    button_id = AutoField()
    text = CharField()
    color = CharField()
    inline = BooleanField()
    trigger_id = ForeignKeyField(Trigger)


class Log(BaseModel):
    log_id = PrimaryKeyField()
    file_name = CharField(null=True)
    line = IntegerField(null=True)
    status = IntegerField()
    date = DateTimeField()
    req_data = CharField()
    method = CharField()
    url = CharField()
    res_data = CharField(null=True)
    error = CharField(null=True)


# database.connect(reuse_if_open=True)
# database.create_tables(
#     [
#         Bot,
#         Admin,
#         BotAdmin,
#         User,
#         DialogState,
#         Dialog,
#         Action,
#         BotMessage,
#         Trigger,
#         UserMessage,
#         KeyboardButton,
#         Log
#     ]
# )
# database.close()

loop = asyncio.new_event_loop()
objects = peewee_async.Manager(database, loop=loop)
database.set_allow_sync(True)
