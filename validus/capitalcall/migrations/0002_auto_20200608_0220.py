# Generated by Django 3.0.7 on 2020-06-08 01:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('capitalcall', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datacall',
            name='call_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='datacommitment',
            name='commitment_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='datafund',
            name='fund_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
