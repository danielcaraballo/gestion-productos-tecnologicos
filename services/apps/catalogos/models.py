from django.db import models

# Create your models here.


class Estatus(models.Model):
    nombre = models.CharField(
        max_length=50, verbose_name="Nombre del Estatus")

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        verbose_name = "Estatus"
        verbose_name_plural = "Estatus"


class Categoria(models.Model):
    nombre = models.CharField(
        max_length=100, verbose_name="Nombre de la Categoria")

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"


class EnfoqueTecnologia(models.Model):
    nombre = models.CharField(max_length=50, verbose_name="Nombre del Enfoque")

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        verbose_name = "Enfoque de la Tecnologia"
        verbose_name_plural = "Enfoque de las Tecnologias"


class LenguajeProgramacion(models.Model):
    nombre = models.CharField(
        max_length=50, verbose_name="Nombre del Lenguaje")

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        verbose_name = "Lenguaje de Programacion"
        verbose_name_plural = "Lenguajes de Programacion"


class Tecnologia(models.Model):
    nombre = models.CharField(
        max_length=100, verbose_name="Nombre de la Tecnologia")
    enfoque = models.ForeignKey(EnfoqueTecnologia, on_delete=models.PROTECT)
    lenguaje = models.ForeignKey(
        LenguajeProgramacion, on_delete=models.PROTECT)

    def __str__(self) -> str:
        return f"{self.nombre} - {self.enfoque}"

    class Meta:
        verbose_name = "Tecnología"
        verbose_name_plural = "Tecnologías"


class Dependencia(models.Model):
    nombre = models.CharField(
        max_length=100, verbose_name="Nombre de la Dependencia")

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        verbose_name = "Dependencia"
        verbose_name_plural = "Dependencias"


class SubDependencia(models.Model):
    nombre = models.CharField(
        max_length=100, verbose_name="Nombre de la SubDependencia")
    dependencia = models.ForeignKey(
        Dependencia, on_delete=models.PROTECT, related_name='sub_dependencias')

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        verbose_name = "SubDependencia"
        verbose_name_plural = "SubDependencias"


class CargoSolicitante(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre del Cargo")

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        verbose_name = "Cargo del Solicitante"
        verbose_name_plural = "Cargos de los Solicitantes"


class RolResponsable(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        verbose_name = "Rol de Responsable"
        verbose_name_plural = "Roles de Responsables"
