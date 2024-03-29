"""empty message

Revision ID: cb399ca2247f
Revises: 0c4ea958328a
Create Date: 2022-08-03 11:57:03.332421

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cb399ca2247f'
down_revision = '0c4ea958328a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userevent',
    sa.Column('id_event', sa.Integer(), nullable=False),
    sa.Column('id_user', sa.Integer(), nullable=True),
    sa.Column('event_name', sa.String(length=80), nullable=True),
    sa.Column('event_place', sa.String(length=80), nullable=True),
    sa.Column('event_date', sa.String(length=80), nullable=True),
    sa.Column('event_time', sa.String(length=80), nullable=True),
    sa.Column('event_description', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['id_user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id_event')
    )
    op.create_table('noeventpeople',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_user', sa.Integer(), nullable=True),
    sa.Column('id_event', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_event'], ['userevent.id_event'], ),
    sa.ForeignKeyConstraint(['id_user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('yeseventpeople',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_user', sa.Integer(), nullable=True),
    sa.Column('id_event', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_event'], ['userevent.id_event'], ),
    sa.ForeignKeyConstraint(['id_user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('yeseventpeople')
    op.drop_table('noeventpeople')
    op.drop_table('userevent')
    # ### end Alembic commands ###
