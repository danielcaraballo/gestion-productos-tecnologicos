# Generated by Django 5.1 on 2025-05-02 21:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0003_trabajooperativo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='responsable',
            name='rol',
        ),
        migrations.AddField(
            model_name='responsableproducto',
            name='rol',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='productos.rolresponsable'),
            preserve_default=False,
        ),
    ]
