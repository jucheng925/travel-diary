"""modify attendance dates

Revision ID: 72b98da478da
Revises: 616997d828f4
Create Date: 2024-04-25 10:03:09.537630

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '72b98da478da'
down_revision = '616997d828f4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('attendances', schema=None) as batch_op:
        batch_op.alter_column('start_date',
               existing_type=sa.DATETIME(),
               type_=sa.Date(),
               existing_nullable=False)
        batch_op.alter_column('end_date',
               existing_type=sa.DATETIME(),
               type_=sa.Date(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('attendances', schema=None) as batch_op:
        batch_op.alter_column('end_date',
               existing_type=sa.Date(),
               type_=sa.DATETIME(),
               existing_nullable=True)
        batch_op.alter_column('start_date',
               existing_type=sa.Date(),
               type_=sa.DATETIME(),
               existing_nullable=False)

    # ### end Alembic commands ###
