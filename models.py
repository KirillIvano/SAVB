from peewee import *

database = PostgresqlDatabase('database') # буду соединяться с сервером, пока локально делаю

class BaseModel(Model):
    class Meta():
        database = database

class admin(BaseModel):
    admin_id = PrimaryKeyField()
    token = CharField(unique=True)

class bot(BaseModel):
    bot_id = PrimaryKeyField()
    token = CharField(unique=True)
    name = CharField()
    admin_is = ForeignKeyField(admin, backref='belongs_to')

class user(BaseModel):
    user_id = PrimaryKeyField()

class dialog_state(BaseModel):
    state_id = PrimaryKeyField()
    bot_id = ForeignKeyField(bot) # don't really understand how to back ref here

class dialog(BaseModel):
    bot_id = ForeignKeyField(bot)
    user_id = ForeignKeyField(user)
    current_state_id = ForeignKeyField(dialog_state)

class action(BaseModel):
    action_id = PrimaryKeyField()
    target_state_id = ForeignKeyField(dialog_state)

class bot_messege(BaseModel):
    messege_id = PrimaryKeyField()
    bot_id = ForeignKeyField(bot)
    text = CharField()
    action_id = ForeignKeyField(action)

class trigger(BaseModel):
    trigger_id = PrimaryKeyField()
    initial_state_id = ForeignKeyField(dialog_state)
    action_id = ForeignKeyField(action)

class user_messege(BaseModel):
    messege_id = PrimaryKeyField()
    text = CharField()
    trigger_id = ForeignKeyField(trigger)

class keyboard_button(BaseModel):
    button_id = PrimaryKeyField()
    text = CharField()
    color = CharField()
    inline = BooleanField()
    trigger_id = ForeignKeyField(trigger)

database.connect()
database.close()