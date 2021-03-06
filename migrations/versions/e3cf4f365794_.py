"""empty message

Revision ID: e3cf4f365794
Revises: f76e0f4cee1d
Create Date: 2022-07-10 16:29:40.192784

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e3cf4f365794'
down_revision = 'f76e0f4cee1d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('comment', 'creation_date',
               existing_type=sa.DATE(),
               type_=sa.DateTime(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('comment', 'creation_date',
               existing_type=sa.DateTime(),
               type_=sa.DATE(),
               nullable=False)
    # ### end Alembic commands ###
