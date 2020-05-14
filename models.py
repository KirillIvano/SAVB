from peewee import *

database = PostgresqlDatabase('database') # буду соединяться с сервером, пока локально делаю

class BaseModel(Model):
    class Meta():
        database = database

class Admin(BaseModel):
    admin_id = PrimaryKeyField()
    token = CharField()

class Bot(BaseModel):
    bot_id = PrimaryKeyField()
    token = CharField()
    name = CharField()
    admin_is = ForeignKeyField(Admin, backref='belongs_to')

class User(BaseModel):
    user_id = PrimaryKeyField()

class Dialog_state(BaseModel):
    state_id = PrimaryKeyField()
    bot_id = ForeignKeyField(Bot) 

class Dialog(BaseModel):
    bot_id = ForeignKeyField(Bot)
    user_id = ForeignKeyField(User)
    current_state_id = ForeignKeyField(Dialog_state)

class Action(BaseModel):
    action_id = PrimaryKeyField()
    target_state_id = ForeignKeyField(Dialog_state)

class Bot_message(BaseModel):
    message_id = PrimaryKeyField()
    bot_id = ForeignKeyField(Bot)
    text = CharField()
    action_id = ForeignKeyField(Action)

class Trigger(BaseModel):
    trigger_id = PrimaryKeyField()
    initial_state_id = ForeignKeyField(Dialog_state)
    action_id = ForeignKeyField(Action)

class User_message(BaseModel):
    message_id = PrimaryKeyField()
    text = CharField()
    trigger_id = ForeignKeyField(Trigger)

class Keyboard_button(BaseModel):
    button_id = PrimaryKeyField()
    text = CharField()
    color = CharField()
    inline = BooleanField()
    trigger_id = ForeignKeyField(Trigger)

database.connect()
database.close()