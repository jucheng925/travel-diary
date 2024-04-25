"""add more validation and relationship

Revision ID: 616997d828f4
Revises: 542aa5a7821d
Create Date: 2024-04-25 09:34:33.018641

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '616997d828f4'
down_revision = '542aa5a7821d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('attendances', schema=None) as batch_op:
        batch_op.alter_column('start_date',
               existing_type=sa.DATETIME(),
               nullable=False)

    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.alter_column('country',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.alter_column('country',
               existing_type=sa.VARCHAR(),
               nullable=True)

    with op.batch_alter_table('attendances', schema=None) as batch_op:
        batch_op.alter_column('start_date',
               existing_type=sa.DATETIME(),
               nullable=True)

    # ### end Alembic commands ###
