from django.db import models
from django.core.exceptions import ValidationError
from simple_history.models import HistoricalRecords
from apps.catalogos.models import Categoria, Estatus, Dependencia, SubDependencia, CargoSolicitante, RolResponsable, Tecnologia


# Create your models here.


class Solicitante(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    cargo = models.ForeignKey(CargoSolicitante, on_delete=models.PROTECT)
    dependencia = models.ForeignKey(
        Dependencia, on_delete=models.PROTECT, related_name='solicitantes')
    sub_dependencia = models.ForeignKey(
        SubDependencia, on_delete=models.PROTECT, null=True, blank=True)

    historial = HistoricalRecords()

    def clean(self):
        if self.sub_dependencia:
            if self.sub_dependencia.dependencia != self.dependencia:
                raise ValidationError(
                    "La SubDependencia no pertenece a la Dependencia asignada.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.nombre} {self.apellido} - {self.dependencia}"

    class Meta:
        verbose_name = "Solicitante"
        verbose_name_plural = "Solicitantes"


class Responsable(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    rol = models.ForeignKey(RolResponsable, on_delete=models.PROTECT)

    historial = HistoricalRecords()

    def __str__(self) -> str:
        return f"{self.nombre} {self.apellido} - {self.rol}"

    class Meta:
        verbose_name = "Responsable"
        verbose_name_plural = "Responsables"


class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    direccion_url = models.URLField()
    fecha_lanzamiento = models.DateField()
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT)
    solicitante = models.ForeignKey(Solicitante, on_delete=models.PROTECT)
    estatus = models.ForeignKey(Estatus, on_delete=models.PROTECT)
    dependencia_usuaria = models.ForeignKey(
        Dependencia, related_name="productos_asignados", on_delete=models.PROTECT)
    subdependencia_usuaria = models.ForeignKey(
        SubDependencia, on_delete=models.PROTECT, null=True, blank=True)

    historial = HistoricalRecords()

    def clean(self):
        if self.subdependencia_usuaria:
            if self.subdependencia_usuaria.dependencia != self.dependencia_usuaria:
                raise ValidationError(
                    "La SubDependencia no pertenece a la Dependencia usuaria.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"


class TrabajoOperativo(models.Model):
    producto = models.ForeignKey(
        'Producto', on_delete=models.CASCADE, related_name='trabajos_operativos')
    descripcion = models.TextField()
    frecuencia = models.CharField(
        max_length=20,
        choices=[
            ('diaria', 'Diaria'),
            ('semanal', 'Semanal'),
            ('mensual', 'Mensual'),
            ('eventual', 'Eventual'),
        ]
    )
    observaciones = models.TextField(blank=True, null=True)
    responsables = models.ManyToManyField('Responsable')
    activo = models.BooleanField(default=True)

    historial = HistoricalRecords()

    def __str__(self):
        return f"{self.producto.nombre} - {self.frecuencia}"

    class Meta:
        verbose_name = "Trabajo Operativo"
        verbose_name_plural = "Trabajos Operativos"

# Definicion de tablas intermedias


class TecnologiaProducto(models.Model):
    tecnologia = models.ForeignKey(Tecnologia, on_delete=models.PROTECT)
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT)

    historial = HistoricalRecords()

    def __str__(self) -> str:
        return f"{self.producto.nombre} - {self.tecnologia.nombre}"

    class Meta:
        verbose_name = "Tecnologia del Producto"
        verbose_name_plural = "Tecnologias de los Productos"
        constraints = [
            models.UniqueConstraint(
                fields=['tecnologia', 'producto'], name='unique_tecnologia_producto')
        ]


class ResponsableProducto(models.Model):
    responsable = models.ForeignKey(Responsable, on_delete=models.PROTECT)
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT)

    historial = HistoricalRecords()

    def __str__(self) -> str:
        return f"{self.producto.nombre} - {self.responsable.nombre}"

    class Meta:
        verbose_name = "Responsable del Producto"
        verbose_name_plural = "Responsables de los Productos"
        constraints = [
            models.UniqueConstraint(
                fields=['responsable', 'producto'], name='unique_responsable_producto')
        ]
