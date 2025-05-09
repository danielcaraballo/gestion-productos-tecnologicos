# Generated by Django 5.1 on 2025-05-02 16:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='responsable',
            name='telefono',
        ),
        migrations.RemoveField(
            model_name='solicitante',
            name='extension',
        ),
        migrations.AddField(
            model_name='producto',
            name='dependencia_usuaria',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, related_name='productos_asignados', to='productos.dependencia'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='producto',
            name='subdependencia_usuaria',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='productos.subdependencia'),
        ),
    ]
