"""empty message

Revision ID: 3e6242c2eda3
Revises: 2d353ed32a82
Create Date: 2024-10-22 00:44:59.586889

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3e6242c2eda3'
down_revision = '2d353ed32a82'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('number')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('number', sa.VARCHAR(length=120), autoincrement=False, nullable=False))

    # ### end Alembic commands ###
