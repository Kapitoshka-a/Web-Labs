from django.contrib import admin
from .api.models import (Establishment, Comment, Service,
                         PriceCategory, Address, Amenity, EstablishmentImage)

# Register your models here.
admin.site.register(Establishment)
admin.site.register(Comment)
admin.site.register(Service)
admin.site.register(PriceCategory)
admin.site.register(Amenity)
admin.site.register(Address)
admin.site.register(EstablishmentImage)
