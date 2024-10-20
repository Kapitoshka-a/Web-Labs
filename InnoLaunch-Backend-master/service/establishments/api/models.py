from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class BaseModel(models.Model):
    objects = models.Manager()

    class Meta:
        abstract = True


class Establishment(BaseModel):
    slug = models.SlugField(max_length=80)
    name = models.CharField(max_length=80)
    type = models.CharField(max_length=30)
    short_description = models.TextField(max_length=1000)
    address = models.OneToOneField('Address', on_delete=models.CASCADE)
    price_category = models.ForeignKey('PriceCategory', on_delete=models.CASCADE)
    capacity = models.IntegerField()
    work_mobile_number = models.CharField(max_length=30)
    is_recommended = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.work_mobile_number}"


class Address(BaseModel):
    city = models.CharField(max_length=30)
    street = models.CharField(max_length=30)
    build_number = models.CharField(max_length=10)

    def __str__(self):
        return f'{self.city}, {self.street}, {self.build_number}'


class PriceCategory(BaseModel):
    price_range = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.price_range} ({self.id})'


class EstablishmentImage(models.Model):
    establishment = models.ForeignKey(Establishment, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='establishment_images')

    def __str__(self):
        return f"Image for {self.establishment.name}"


class Amenity(BaseModel):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    establishments = models.ManyToManyField(Establishment, related_name='amenities')

    def __str__(self):
        return f'{self.name}'


class Service(BaseModel):
    name = models.CharField(max_length=100)
    establishments = models.ManyToManyField(Establishment, related_name='services')

    def __str__(self):
        return f'{self.name}'


class Comment(BaseModel):
    author = models.CharField(max_length=20)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    content = models.TextField(500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE, related_name='comments')

    class Meta:
        ordering = ('created_at',)

    def __str__(self):
        return f"{self.author}({self.created_at}) - {self.id}"
